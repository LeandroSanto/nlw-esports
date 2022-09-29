import express from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

import { convertHoursStringToMinutes } from './utils/convertHoursStringToMinutes';
import { convertMinutesToHoursString } from './utils/convertMinutesToHoursString';

const server = express();
const prisma = new PrismaClient();

server.use(express.json())
server.use(cors())

server.get('/games', async (request, response) =>{
  const games = await prisma.game.findMany({
    include:{
      _count:{
        select:{
          ads: true,
        }
      }
    }
  });
  return response.status(201).json(games);
})

server.get('/games/:id/ads', async (request, response) =>{
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select:{
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where:{
      gameId,
    },
    orderBy:{
      createdAt:'desc',
    }
  })
  return response.status(201).json(ads.map(ad =>{
    return{
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHoursString(ad.hourStart),
      hourEnd: convertMinutesToHoursString(ad.hourEnd),
    }
  }));
})

server.get('/ads/:id/discord', async (request, response) =>{
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select:{
      discord: true,
    },
    where:{
      id: adId,
    }
  })
  return response.status(201).json({
    discord: ad.discord,
  });
})



server.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(201).json(ad);
})

server.get('/ads',(request, response) => {
  return response.json([])
})





server.listen(3333);
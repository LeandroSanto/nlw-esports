import {useState, useEffect, FormEvent} from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';

import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { SelectContentItem } from './Form/SelectContentItem';


interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count:{
    ads:number;
  }
}

export function CreateAdModal(){
  const [ games, setGames ] = useState<Game[]>([]);
  const [ weekDays, setWeekDays ] = useState<string[]>([]);
  const [ useVoiceChannel, setUseVoiceChannel ] = useState<boolean>();



  async function handleCreateAd(event: FormEvent ){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name || !data.game || !data.discord || !data.yearsPlaying || !weekDays || !data.hourStart || !data.hourEnd){
      return alert('Os campos não podem estar vazios.'); 
    }
  
    try{
      await axios.post(`http://10.0.1.196:3333/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays:weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd:data.hourEnd,
      useVoiceChannel:useVoiceChannel,
      })
      alert('Anúncio criado com sucesso!')

    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio!')
    }

  }

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  },[])



  return(
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-back/25'>
            <Dialog.Title className='font-black text-3xl '>Publique um anúncio</Dialog.Title>

            <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2 '>
                <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                <Select.Root  name='game'>
                  <Select.Trigger  className='rounded bg-zinc-900 flex p-3 justify-between'>
                    <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
                    
                    <Select.SelectIcon>
                      <CaretDown className='w-6 h-6 ' />
                    </Select.SelectIcon>
                    
                    <Select.SelectContent>
                        <Select.Group className='bg-zinc-900 flex-col align-center justify-between'>
                          <Select.Label>Selecione o game que deseja jogar</Select.Label>
                          {games.map(game => <SelectContentItem  key={game.id} itemId={game.id} itemValue={game.title} /> )}
                        </Select.Group>
                    </Select.SelectContent>
                  
                  </Select.Trigger>
                </Select.Root>
              </div>
              
              <div className='flex flex-col gap-2'>
                <label htmlFor='name'>Seu nome(ou nickname)</label>
                <Input name='name' id='name' type='text' placeholder='Como te chamam dento do game'/>
              </div>

              <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yearsPlaying'>Joga a quantos anos?</label>
                <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO'/>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>Seu nome(ou nickname)</label>
                <Input name='discord' id='discord' type='text' placeholder='Usuário#0000'/>
              </div>
              </div>

              <div className='flex gap-6'>
                <div className='grid grids-col-4 gap-2'>
                  <label htmlFor='weekDays'>Quando costuma jogar?</label>
                  <div>
                    <ToggleGroup.Root name='weekDays' id='weekDays' value={weekDays} onValueChange={setWeekDays} type='multiple' className='grid grid-cols-4 gap-2'>
                      <ToggleGroup.Item value='0' title='Domingo' className={`w-8 h-8 rounded ${weekDays.includes ('0') ? 'bg-violet-500' : 'bg-zinc-900' } `}>D</ToggleGroup.Item>
                      <ToggleGroup.Item value='1' title='Segunda' className={`w-8 h-8 rounded ${weekDays.includes ('1') ? 'bg-violet-500' : 'bg-zinc-900' } `}>S</ToggleGroup.Item>
                      <ToggleGroup.Item value='2' title='Terça'   className={`w-8 h-8 rounded ${weekDays.includes ('2') ? 'bg-violet-500' : 'bg-zinc-900' } `}>T</ToggleGroup.Item>
                      <ToggleGroup.Item value='3' title='Quarta'  className={`w-8 h-8 rounded ${weekDays.includes ('3') ? 'bg-violet-500' : 'bg-zinc-900' } `}>Q</ToggleGroup.Item>
                      <ToggleGroup.Item value='4' title='Quinta'  className={`w-8 h-8 rounded ${weekDays.includes ('4') ? 'bg-violet-500' : 'bg-zinc-900' } `}>Q</ToggleGroup.Item>
                      <ToggleGroup.Item value='5' title='sexta'   className={`w-8 h-8 rounded ${weekDays.includes ('5') ? 'bg-violet-500' : 'bg-zinc-900' } `}>S</ToggleGroup.Item>
                      <ToggleGroup.Item value='6' title='Sabado'  className={`w-8 h-8 rounded ${weekDays.includes ('6') ? 'bg-violet-500' : 'bg-zinc-900' } `}>S</ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor='hourStart'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input name='hourStart' id='hourStart' type='time' placeholder='De'/>
                    <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até'/>
                  </div>
                </div>
                </div>

                <label className='mt-2 flex gap-2 text-sm'>
                  <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => { checked=== true ?  setUseVoiceChannel(true) : setUseVoiceChannel(false) } } id='useVoiceChannel' className='w-6 h-6 rounded bg-zinc-900'>
                    <Checkbox.Indicator>
                      <Check className='w-5 h-5  text-emerald-400'/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                   Costumo me conectar ao chat de voz
                </label>

                <footer className='mt-4 flex justify-between'>
                  <button className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</button>
                  <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold  flex items-center gap-3 hover:bg-violet-600'type='submit'>
                    <GameController  className='w-6 h-6' size={24}/>
                    Encontrar Duo
                  </button>
                </footer>

               
            </form>
            
          </Dialog.Content>

        </Dialog.Portal>
  )
}
interface GameBannerProps{
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner({bannerUrl,title,adsCount}:GameBannerProps){
    return(
      <a className='relative rounded-lg overflow-hidden  overflow-hidden' href=''>
        <img src={bannerUrl} alt='game1'/>
        <div className='w-full pt-16 pb-4 px-4 bg-gameCardGradient absolute bottom-0 right-0 left-0'>
          <strong className='font-bold text-white block'>{title}</strong>
          <span className='text-zinc-300 text-sm block'>{adsCount} anúncio(s)</span>
        </div>
      </a>
    )
}
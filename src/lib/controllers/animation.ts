export const AnimationShortCuts=(toggleMoreLists : boolean)=>{
    const click_cate = document.getElementById('category-shortcuts')
    const click_playlists = document.getElementById('playlists-shortcuts')
    const click_artist = document.getElementById('artist-shortcuts')

    

    if(!toggleMoreLists){
      click_playlists?.classList.remove('d-none')
      click_cate?.classList.replace('show','hide')
      click_artist?.classList.replace('show','hide')

      // click?.classList.add('hide')
      setTimeout(() => {
        click_cate?.classList.add('d-none')
        click_artist?.classList.add('d-none')
        click_playlists?.classList.replace('hide','show')
      }, 180);
    }
    else{
      click_cate?.classList.remove('d-none')
      click_artist?.classList.remove('d-none')
      click_playlists?.classList.replace('show','hide')

      setTimeout(() => {
        click_cate?.classList.replace('hide','show')
        click_artist?.classList.replace('hide','show')
        click_playlists?.classList.add('d-none')
      }, 180);
    }
}


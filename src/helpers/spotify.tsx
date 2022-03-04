
export default function getTime(time : number){
    const minute : number = Math.floor(time/60000)
    const second : number = Math.floor(time/1000 - minute*60 )
    const duration : string = minute + ':' + second
    const durationFix : string = minute + ':0' + second
    if(second < 10) return durationFix;
    return duration;
}

export function getTimeMyList(time : number){
    const minute : number = Math.floor(time/60000)
    const second : number = Math.floor(time/1000 - minute*60 )
    const duration : string = minute + ' phút ' + second + ' giây'
    const durationFix : string = minute + ' phút 0' + second + ' giây'
    if(second < 10) return durationFix;
    return duration;
}

export function getNamePlaylist(name : string){
    const word = name.split('-')
    return word[0]
}
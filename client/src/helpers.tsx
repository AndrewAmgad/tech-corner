
/**
 * Takes time in ms and returns time in minutes, hours or days
 */

export const formatTime = (ms: number | undefined) => {
    if(!ms) return null;
    
    const currentDate = Date.now();
    const time: number = currentDate - ms;

    const minutes: number = parseInt((time / 60000).toFixed())
  
    if(minutes < 1) return "Less than a minute ago"
    else if(minutes < 60) return `${minutes} minutes ago`;

    const hours: number = parseInt((minutes / 60).toFixed());

    if(hours < 24) {
        if(hours === 1 ) return `${hours} hour ago`
        return `${hours} hours ago`
    }; 

    const days: number = parseInt((hours / 24).toFixed());

    if(days < 24) return `${days} days ago`;

};
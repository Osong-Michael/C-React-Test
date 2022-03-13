export const dayFormatter = date => {
    let result = '';
    const productDate = new Date(date);
    const todayDate = new Date();
    const todayDateFormatted = (todayDate.getMonth() +1) +'/' + todayDate.getDate() +'/' + todayDate.getFullYear();
    const productDateFormatted = (productDate.getMonth() +1) +'/' + productDate.getDate() + '/' + productDate.getFullYear();
  
    const date1 = new Date(todayDateFormatted);
    const date2 = new Date(productDateFormatted);
    const diffDays = Math.abs(parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10));
  
    if (diffDays === 0 ) {
        result = 'Added Today';
    } else if (diffDays === 1) {
        result = 'Added 1 day ago';
    } else if (diffDays <= 7) {
        result = 'Added ' + diffDays + ' days ago';
    } else {
        result = 'Added on ' + productDateFormatted;
    };
    
    return result;
};
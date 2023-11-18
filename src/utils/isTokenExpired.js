
export default function isTokenExpired(decodedToken) {
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }
  
    const currentTimestamp = Math.floor(Date.now() / 1000);
  
    return decodedToken.exp < currentTimestamp;
}
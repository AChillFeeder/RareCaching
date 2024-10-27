export async function customGetAllFetch(endpoint) {
    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`);  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data
    } else {
        console.error(`Erreur lors de la récupération des données depuis ${endpoint}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };
  


  

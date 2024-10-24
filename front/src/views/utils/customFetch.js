export async function customFetch(endpoint) {
    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`);  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data
    } else {
        console.error('Erreur lors de la récupération des parties');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

// export default customFetch;



  const getProvider = () => {
    const response = await fetch(`http://svc.metrotransit.org/NexTrip/{ROUTE}/{DIRECTION}/{STOP}`)
    if (response.status >= 400) {
      this.setState({errorStatus: 'Error fetching provider list'});
    } else {
      response.json().then(data => {
        this.setState({
            ...this.state.providerList, 
            providerList: data.groceries
        })
      });
    }
  }
  
export default getProvider;

function Services() {
  this.fetchData = function () {
    var promise = axios({
      url: "https://625bc0d2398f3bc782ae7e24.mockapi.io/api/products",
      method: "GET",
    });

    return promise;
  };
}

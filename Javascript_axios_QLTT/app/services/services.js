function Services() {
  this.fetchData = function () {
    return axios({
      url: "https://625bc0d2398f3bc782ae7e24.mockapi.io/api/products",
      method: "GET",
    });
  };

  this.deleteUserById = function (id) {
    return axios({
      url: `https://625bc0d2398f3bc782ae7e24.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
  };
  this.addUser = function (user) {
    return axios({
      url: "https://625bc0d2398f3bc782ae7e24.mockapi.io/api/products/",
      method: "POST",
      data: user,
    });
  };
  this.getUserById = function (id) {
    return axios({
      url: `https://625bc0d2398f3bc782ae7e24.mockapi.io/api/products/${id}`,
      method: "GET",
    });
  };
  this.putUserById = function (user) {
    return axios({
      url: `https://625bc0d2398f3bc782ae7e24.mockapi.io/api/products/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}

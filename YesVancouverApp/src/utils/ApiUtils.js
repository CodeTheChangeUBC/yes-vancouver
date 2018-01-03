var ApiUtils = {  

    constructFormUrlEncodedBody: function(body) {
        var formBody = [];
        for (var property in body) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(body[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody)
        return formBody;
    }
  };

  export { ApiUtils as default };
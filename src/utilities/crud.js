export const ajaxFunction = async function(data, method, url) {

  let request = '';
  
  /*
    data: JSON
    method: GET POST PUT DELETE
    url: API
  */
  try {
    if(method == 'GET') {
      request = await fetch(url, {
        method,
        headers: {
          'Content-type': 'application/json',
        }
      });
    }else {
      request = await fetch(url, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    }

    //console.log(JSON.stringify(data));
    //const dataRequest = await request.json();

    //console.log(request);
    //console.log(dataRequest);

    return request;
  } catch (error) {
    console.log(error);
    return error;
  }
}
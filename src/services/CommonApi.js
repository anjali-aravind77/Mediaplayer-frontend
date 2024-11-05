// here i create steps for api call

import axios from "axios"

const CommonApi = async (httpMethod,url,reqBody) => {
 
        const reqConfig = {
            method:httpMethod,
            url,
            data:reqBody
        }

      return await axios(reqConfig).then(res => { //this will help in api call, when axios is called it is asynchronous function. since it is a function, use a return statement.
        return res
      }).catch(err => {
        return err
      })
}

export default CommonApi
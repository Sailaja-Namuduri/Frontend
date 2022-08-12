import axios from "axios"
const baseUrl='http://localhost:2020/'
class ServerCall{

    static fnGet(url){
        return axios.get(baseUrl+url)
    }

   static fnPost(url,data){
       return axios.post(baseUrl+url,data)
       
   }

   static fnDelete(url){
        return axios.delete(baseUrl+url)
    }

   static fnPut(url,data){
     return axios.put(baseUrl+url,data)
    }
}

export default ServerCall



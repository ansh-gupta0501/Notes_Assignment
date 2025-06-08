import {data} from './mockData.js'
export const getData = (req,res)=>{
    const {inputData} = req.body
    const mockData = data[inputData]

    if(!mockData) return res.sendStatus(400)

    return res.send(mockData)
}
import axios from 'axios'
import moment from 'moment'

export default {
  async findAllDeveloper(devData) {
    return await axios
      .get(
        `${process.env.VUE_APP_API_URL}developers?` +
          `page=${parseInt(devData.page)}&limit=${parseInt(
            devData.limit
          )}&search=${devData.search}`
      )
      .then(res => {
        return res.data
      })
  },

  async createDeveloper(devData) {
    return await axios
      .post(`${process.env.VUE_APP_API_URL}developers`, devData)
      .then(res => {
        return res.data
      })
  },

  async updateDeveloper(devData) {
    return await axios
      .put(`${process.env.VUE_APP_API_URL}developers/` + devData._id, {
        _id: devData._id,
        name: devData.name,
        sex: devData.sex,
        age: devData.age,
        birthdate: moment(devData.birthdate).format('YYYY-MM-DD'),
        hobby: devData.hobby
      })
      .then(res => {
        return res.data
      })
  },

  async deleteDeveloper(id) {
    return await axios.delete(`${process.env.VUE_APP_API_URL}developers/` + id)
  }
}

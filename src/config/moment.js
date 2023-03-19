import moment from 'moment'

export const configTime = (time) => {
  // return moment().startOf(time).fromNow()
  return moment(time).format('MMMM Do YYYY, h:mm a')
}

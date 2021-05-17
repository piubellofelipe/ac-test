import moment from "moment";
import { Call, GroupedCalls } from "./redux/calls";

export const groupCallsByDay = (calls: Call[]): GroupedCalls => {
  const sortCallsByDate = (callA: Call, callB: Call) => {
    return new Date(callA.created_at).getTime() - new Date(callB.created_at).getTime();
  }
  const grouped = calls.sort(sortCallsByDate).reduce((previousValue, currentValue) => {
    const callDate = currentValue.created_at;
    const parsedCallDate = convertCallDateToGroupName(callDate)
    const groupIndex = previousValue.findIndex(callgroup => callgroup.date === parsedCallDate);
    if (groupIndex > -1) {
      previousValue[groupIndex].calls.push(currentValue.id)
    } else {
      previousValue.push({
        date: parsedCallDate,
        calls: [currentValue.id]
      })
    }
    return previousValue;
  }, [] as GroupedCalls)

  return grouped;
}

export const convertCallDateToGroupName = (date: string): string => {
  return moment(date).format('MMMM Do YYYY');
}

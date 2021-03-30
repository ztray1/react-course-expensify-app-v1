export default ((expenses)=>{
    return expenses.map((expense)=>expense.amount).reduce((accumulate,current)=>{
        return accumulate+current
    },0)
})
import { IProgress } from '../../Entities/interfaces/progress.interface'
const ProgressBar = ({progressArray}:{progressArray:IProgress[]}) => {
  return (
    <div>
        {
            progressArray.map((p:IProgress)=>{
                return(
                    <div>{p.pacientName}</div>
                )
            })
        }
    </div>
  )
}

export default ProgressBar
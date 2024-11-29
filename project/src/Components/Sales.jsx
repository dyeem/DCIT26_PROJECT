// import {connect} from 'react-redux'
// import { buyCrochet } from "./Redux"

import { useSelector, useDispatch } from "react-redux"
import { buyCrochet } from "./Redux"

function Sales() {
  const numOfCrochet = useSelector(state => state.numOfCrochet)
  const dispatch = useDispatch()

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white text-black">
          <h1>Quantity of the Product - {numOfCrochet} </h1>
          <button 
          onClick={() => dispatch(buyCrochet())}
          className="btn">Buy Now</button>
      </div>
    </>
  )
}

// const mapStateToProps = state => {
//   return{
//     numOfCrochet: state.numOfCrochet
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return{
//     buyCrochet: () => dispatch(buyCrochet())
//   }
// }

// export default connect (mapStateToProps, mapDispatchToProps) (Sales)
export default Sales
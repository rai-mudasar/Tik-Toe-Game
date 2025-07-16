
const Box = (props) => {
    return (
        <div onClick={props.onClick} 
            className="w-25 h-25 border-2 font-bold text-5xl flex items-center justify-center cursor-pointer">
            {props.value}
        </div>
    )
};

export default Box;
import { MdDeleteForever} from "react-icons/md";
import { IoIosAdd} from "react-icons/io";
import {FaEdit} from "react-icons/fa"

import "./control-panel.scss"

const ControlPanel = () => {
    return (
        <div className="control_panel">
            <MdDeleteForever />
            <IoIosAdd/>
            <FaEdit/>
        </div>
    )
}

export default ControlPanel;
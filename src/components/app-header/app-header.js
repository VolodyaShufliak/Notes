import ControlPanel from "../control-panel/control-panel";
import SearchBox from "../search-box/search-box"

import "./app-header.scss"

const AppHeader = () => {
    return (
        <div className="appheader">
            <ControlPanel/>
            <SearchBox/>
        </div>
    )
}
export default AppHeader;
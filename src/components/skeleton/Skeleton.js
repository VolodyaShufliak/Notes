import './skeleton.scss';

const Skeleton = () => {
    return (
        <div className='skeleton_container'>
            <p className="note__select">Please select a note</p>
            <div className="pulse skeleton__header">
                <div className="pulse skeleton__small"></div>
                <div className="pulse skeleton__mini"></div>
            </div>
            <div className="pulse skeleton__block"></div>
            <div className="pulse skeleton__block"></div>
            <div className="pulse skeleton__block"></div>
        </div>
    )
}

export default Skeleton;
import { SVGAttributes, FC } from "react"


export const UploadIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg version="1.1" viewBox="0 0 14 19" {...props} xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill="#000000" id="Core" transform="translate(-425.000000, -213.000000)">
                <g id="file-upload" transform="translate(425.000000, 213.500000)">
                    <path d="M4,13 L10,13 L10,7 L14,7 L7,0 L0,7 L4,7 L4,13 Z" id="Shape" />
                    <rect height="2" id="Rectangle-path" width="14" x="0" y="15" />
                </g>
            </g>
        </g>
    </svg>
}


export const ImageIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg version="1.1" viewBox="0 0 18 18" {...props} xmlns="http://www.w3.org/2000/svg" >
        <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill="#000000" id="Core" transform="translate(-171.000000, -171.000000)">
                <g id="drive-image" transform="translate(171.000000, 171.000000)">
                    <path d="M18,16 L18,2 C18,0.9 17.1,0 16,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,16 Z M5.5,10.5 L8,13.5 L11.5,9 L16,15 L2,15 L5.5,10.5 L5.5,10.5 Z" id="Shape" />
                </g>
            </g>
        </g>
    </svg>
}


export const DeleteIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} >
        <g>
            <path d="M8.3,15.7C8.5,15.9,8.7,16,9,16s0.5-0.1,0.7-0.3l2.3-2.3l2.3,2.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l2.3-2.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L9.7,8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l2.3,2.3l-2.3,2.3C7.9,14.7,7.9,15.3,8.3,15.7z" />
            <path d="M12,21c5,0,9-4,9-9s-4-9-9-9s-9,4-9,9S7,21,12,21z M12,5c3.9,0,7,3.1,7,7s-3.1,7-7,7s-7-3.1-7-7S8.1,5,12,5z" />
        </g>
    </svg>
}


export const LoadingIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0"
            to="360"
            dur="2s"
            repeatCount="indefinite"
        />
        <g id="grid_system" />
        <g id="_icons">
            <g>
                <path d="M12,2c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1s1-0.4,1-1V3C13,2.4,12.6,2,12,2z" />
                <path d="M14.5,7.7c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5l1.5-2.6c0.3-0.5,0.1-1.1-0.4-1.4c-0.5-0.3-1.1-0.1-1.4,0.4    l-1.5,2.6C13.9,6.8,14,7.4,14.5,7.7z" />
                <path d="M16.3,9.5c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l2.6-1.5c0.5-0.3,0.6-0.9,0.4-1.4c-0.3-0.5-0.9-0.6-1.4-0.4    l-2.6,1.5C16.2,8.4,16.1,9,16.3,9.5z" />
                <path d="M21,11l-3,0c0,0,0,0,0,0c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1l3,0c0,0,0,0,0,0c0.6,0,1-0.4,1-1C22,11.5,21.6,11,21,11z" />
                <path d="M20.3,15.7l-2.6-1.5c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4l2.6,1.5c0.2,0.1,0.3,0.1,0.5,0.1    c0.3,0,0.7-0.2,0.9-0.5C20.9,16.5,20.8,15.9,20.3,15.7z" />
                <path d="M15.8,16.7c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4l1.5,2.6c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1    c0.5-0.3,0.6-0.9,0.4-1.4L15.8,16.7z" />
                <path d="M12,17c-0.5,0-1,0.4-1,1l0,3c0,0.6,0.4,1,1,1c0,0,0,0,0,0c0.5,0,1-0.4,1-1l0-3C13,17.5,12.5,17,12,17z" />
                <path d="M9.5,16.3C9,16,8.4,16.2,8.1,16.7l-1.5,2.6c-0.3,0.5-0.1,1.1,0.4,1.4c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5    l1.5-2.6C10.1,17.2,10,16.6,9.5,16.3z" />
                <path d="M7.7,14.5c-0.3-0.5-0.9-0.6-1.4-0.4l-2.6,1.5c-0.5,0.3-0.6,0.9-0.4,1.4c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1    l2.6-1.5C7.8,15.6,7.9,15,7.7,14.5z" />
                <path d="M6,13c0.5,0,1-0.4,1-1c0-0.6-0.4-1-1-1l-3,0c0,0,0,0,0,0c-0.5,0-1,0.4-1,1c0,0.6,0.4,1,1,1L6,13C6,13,6,13,6,13z" />
                <path d="M3.7,8.3l2.6,1.5C6.5,9.9,6.7,10,6.8,10c0.3,0,0.7-0.2,0.9-0.5C8,9,7.8,8.4,7.3,8.1L4.7,6.6C4.3,6.3,3.7,6.5,3.4,6.9    C3.1,7.4,3.3,8,3.7,8.3z" />
            </g>
        </g>
    </svg>
}


export const CircleIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.486 2 2 6.486 2 12c.001 5.515 4.487 10.001 10 10.001 5.514 0 10-4.486 10.001-10.001 0-5.514-4.486-10-10.001-10zm0 18.001c-4.41 0-7.999-3.589-8-8.001 0-4.411 3.589-8 8-8 4.412 0 8.001 3.589 8.001 8-.001 4.412-3.59 8.001-8.001 8.001z" />
    </svg>
}


export const SquareIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z" />
    </svg>
}


export const PenIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return (
        <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z" />
        </svg>
    )
}


export const CropIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return (
        <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg"><path d="M19 7c0-1.103-.897-2-2-2H7V2H5v3H2v2h15v15h2v-3h3v-2h-3V7z" />
            <path d="M5 9v8c0 1.103.897 2 2 2h8v-2H7V9H5z" />
        </svg>
    )
}


export const ColorFillCircleIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg id="Layer_1" version="1.1" viewBox="0 0 512 512" {...props} xmlns="http://www.w3.org/2000/svg">
        <g>
            <g>
                <path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7    c-105.1,0-190.7-85.5-190.7-190.7c0-105.1,85.5-190.7,190.7-190.7c105.1,0,190.7,85.5,190.7,190.7    C446.7,361.1,361.1,446.7,256,446.7z" />
            </g>
        </g>
        <g>
            <g>
                <path d="M256,96c-88.4,0-160,71.6-160,160c0,88.4,71.6,160,160,160c88.4,0,160-71.6,160-160C416,167.6,344.4,96,256,96z" />
            </g>
        </g>
    </svg>
}


export const LinesIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg fill="none" {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.75 5C2.33579 5 2 5.33579 2 5.75C2 6.16421 2.33579 6.5 2.75 6.5H6.25C6.66421 6.5 7 6.16421 7 5.75C7 5.33579 6.66421 5 6.25 5H2.75ZM2.75244 11.503H21.2524C21.6667 11.503 22.0024 11.8388 22.0024 12.253C22.0024 12.6327 21.7203 12.9465 21.3542 12.9961L21.2524 13.003H2.75244C2.33823 13.003 2.00244 12.6672 2.00244 12.253C2.00244 11.8733 2.2846 11.5595 2.65067 11.5098L2.75244 11.503ZM2 18.25C2 17.5596 2.55964 17 3.25 17H20.75C21.4404 17 22 17.5596 22 18.25C22 18.9404 21.4404 19.5 20.75 19.5H3.25C2.55964 19.5 2 18.9404 2 18.25ZM9.75 5.75C9.75 5.33579 10.0858 5 10.5 5H13.5C13.9142 5 14.25 5.33579 14.25 5.75C14.25 6.16421 13.9142 6.5 13.5 6.5H10.5C10.0858 6.5 9.75 6.16421 9.75 5.75ZM17.75 5C17.3358 5 17 5.33579 17 5.75C17 6.16421 17.3358 6.5 17.75 6.5H21.25C21.6642 6.5 22 6.16421 22 5.75C22 5.33579 21.6642 5 21.25 5H17.75Z" fill="#212121" />
    </svg>
}


export const TriangleIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg fill="none" strokeWidth="2" viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4752 2.94682C11.7037 2.53464 12.2963 2.53464 12.5248 2.94682L21.8985 19.8591C22.1202 20.259 21.831 20.75 21.3738 20.75H2.62625C2.16902 20.75 1.87981 20.259 2.10146 19.8591L11.4752 2.94682Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}


export const PolygonIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M20 14.185v-2.369A2.997 2.997 0 0 0 22 9c0-1.654-1.346-3-3-3a2.99 2.99 0 0 0-2.116.876L12.969 5.31c.01-.103.031-.204.031-.31 0-1.654-1.346-3-3-3S7 3.346 7 5c0 .762.295 1.451.765 1.981L6.091 9.212A2.977 2.977 0 0 0 5 9c-1.654 0-3 1.346-3 3s1.346 3 3 3c.159 0 .313-.023.465-.047L7.4 17.532c-.248.436-.4.932-.4 1.468 0 1.654 1.346 3 3 3a2.994 2.994 0 0 0 2.863-2.153l3.962-.792A2.987 2.987 0 0 0 19 20c1.654 0 3-1.346 3-3a2.995 2.995 0 0 0-2-2.815zM19 8a1.001 1.001 0 1 1-1 1c0-.551.448-1 1-1zm-9-4a1.001 1.001 0 1 1-1 1c0-.551.448-1 1-1zm-6 8a1.001 1.001 0 1 1 1 1c-.552 0-1-.449-1-1zm6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2.761-2.172A3.005 3.005 0 0 0 10 16c-.386 0-.752.079-1.091.213l-1.674-2.231C7.705 13.451 8 12.762 8 12c0-.536-.152-1.032-.399-1.467l1.935-2.58c.152.024.305.047.464.047a2.99 2.99 0 0 0 2.116-.876l3.915 1.566c-.01.103-.031.204-.031.31 0 1.302.839 2.401 2 2.815v2.369a2.996 2.996 0 0 0-2 2.815c0 .061.015.117.018.177l-3.257.652zM19 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
}


export const Line2Icon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12 L24 12" stroke="black" strokeWidth="2" />
    </svg>
}


export const Line3Icon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12 L24 12" stroke="black" strokeWidth="3" />
    </svg>
}


export const DotLineIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12 L24 12" stroke="black" strokeWidth="3" strokeDasharray="3" />
    </svg>
}

export const DashLineIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12 L24 12" stroke="black" strokeWidth="3" strokeDasharray="6" />
    </svg>
}


export const LeftArrow: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg data-name="Layer 1" style={{ transform: 'rotate(180deg)' }} id="Layer_1" viewBox="0 0 200 200" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M132.72,78.75l-56.5-56.5a9.67,9.67,0,0,0-14,0,9.67,9.67,0,0,0,0,14l56.5,56.5a9.67,9.67,0,0,1,0,14l-57,57a9.9,9.9,0,0,0,14,14l56.5-56.5C144.22,109.25,144.22,90.25,132.72,78.75Z" />
    </svg>
}


export const RightArrow: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 200 200" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M132.72,78.75l-56.5-56.5a9.67,9.67,0,0,0-14,0,9.67,9.67,0,0,0,0,14l56.5,56.5a9.67,9.67,0,0,1,0,14l-57,57a9.9,9.9,0,0,0,14,14l56.5-56.5C144.22,109.25,144.22,90.25,132.72,78.75Z" />
    </svg>
}


export const PointerIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M20.978 13.21a1 1 0 0 0-.396-1.024l-14-10a.999.999 0 0 0-1.575.931l2 17a1 1 0 0 0 1.767.516l3.612-4.416 3.377 5.46 1.701-1.052-3.357-5.428 6.089-1.218a.995.995 0 0 0 .782-.769z" />
    </svg>
}


export const EraserIcon: FC<SVGAttributes<SVGElement>> = ({ ...props }) => {
    return <svg fill="currentColor" {...props} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
    </svg>
}
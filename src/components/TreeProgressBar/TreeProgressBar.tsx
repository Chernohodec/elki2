export type TreeProgressBarProps = {
    percents: number;
    className: string;
};

const TreeProgressBar = ({ percents, className }: TreeProgressBarProps) => {
    const clampedPercents = Math.max(0, Math.min(100, percents));

    // Параметры для дуги прогресса (подогнаны под форму полукруга)
    const radius = 110;
    const strokeWidth = 20;
    const circumference = Math.PI * radius;
    const strokeDashoffset =
        circumference - (clampedPercents / 100) * circumference;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={270}
            height={137}
            fill="none"
            className={className}
            viewBox="0 0 270 137"
        >
            <defs>
                <clipPath id="b" transform="translate(33.044 32.7)">
                    <path d="M256 136c7.732 0 14.075-6.285 13.275-13.976a135 135 0 0 0-268.55 0C-.075 129.715 6.268 136 14 136h48.442c7.732 0 13.834-6.356 15.666-13.868a58.557 58.557 0 0 1 98.299-27.539 58.55 58.55 0 0 1 15.485 27.54c1.832 7.512 7.934 13.867 15.666 13.867H256Z" />
                </clipPath>
                <clipPath id="c" transform="translate(33.044 32.7)">
                    <path d="M256 136c7.732 0 14.075-6.285 13.275-13.976a135 135 0 0 0-268.55 0C-.075 129.715 6.268 136 14 136h.997c7.732 0 13.905-6.296 14.923-13.96A106.006 106.006 0 0 1 135 29.997a106.001 106.001 0 0 1 105.08 92.043c1.018 7.664 7.191 13.96 14.923 13.96H256Z" />
                </clipPath>
                <clipPath id="d" transform="translate(33.044 32.7)">
                    <path d="M256 136c7.732 0 14.075-6.285 13.275-13.976a135 135 0 0 0-268.55 0C-.075 129.715 6.268 136 14 136h.997c7.732 0 13.905-6.296 14.923-13.96A106.006 106.006 0 0 1 135 29.997a106.001 106.001 0 0 1 105.08 92.043c1.018 7.664 7.191 13.96 14.923 13.96H256Z" />
                </clipPath>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h270v137H0z" />
                </clipPath>
                <linearGradient
                    id="e"
                    x1={135}
                    x2={135}
                    y1={1}
                    y2={271}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#EA0300" />
                    <stop offset={1} stopColor="#840715" />
                </linearGradient>
            </defs>

            <g clipPath="url(#a)">
                {/* Фоновые элементы */}
                <foreignObject
                    width={336.088}
                    height={202.4}
                    x={-33.044}
                    y={-32.7}
                >
                    <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            backdropFilter: "blur(16.85px)",
                            clipPath: "url(#b)",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </foreignObject>

                <path
                    fill="#fff"
                    fillOpacity={0.21}
                    d="M256 136c7.732 0 14.075-6.285 13.275-13.976a135 135 0 0 0-268.55 0C-.075 129.715 6.268 136 14 136h48.442c7.732 0 13.834-6.356 15.666-13.868a58.557 58.557 0 0 1 98.299-27.539 58.55 58.55 0 0 1 15.485 27.54c1.832 7.512 7.934 13.867 15.666 13.867H256Z"
                    data-figma-bg-blur-radius={33.7}
                />

                {/* Прогресс-бар по контуру полукруга */}
                <path
                    d="M25 135
                       A110 110 0 0 1 245 135"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                <path
                    d="M25 135 
                       A110 110 0 0 1 245 135"
                    fill="none"
                    stroke="url(#e)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition: "stroke-dashoffset 0.3s ease",
                        filter: "drop-shadow(0px 2px 8px rgba(234, 3, 0, 0.5))",
                    }}
                />

                {/* Основной дизайн поверх прогресс-бара */}
                {/* <g data-figma-bg-blur-radius={33.7}>
                    <path
                        fill="#fff"
                        fillOpacity={0.58}
                        d="M256 136c7.732 0 14.075-6.285 13.275-13.976a135 135 0 0 0-268.55 0C-.075 129.715 6.268 136 14 136h.997c7.732 0 13.905-6.296 14.923-13.96A106.006 106.006 0 0 1 135 29.997a106.001 106.001 0 0 1 105.08 92.043c1.018 7.664 7.191 13.96 14.923 13.96H256Z"
                    />
                    <path
                        fill="url(#e)"
                        fillOpacity={0.3}
                        d="M256 136c7.732 0 14.075-6.285 13.275-13.976a135 135 0 0 0-268.55 0C-.075 129.715 6.268 136 14 136h.997c7.732 0 13.905-6.296 14.923-13.96A106.006 106.006 0 0 1 135 29.997a106.001 106.001 0 0 1 105.08 92.043c1.018 7.664 7.191 13.96 14.923 13.96H256Z"
                    />
                </g> */}
            </g>
        </svg>
    );
};

export default TreeProgressBar;

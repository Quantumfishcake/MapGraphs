// import React from 'react';
// import { AreaClosed, Line, Bar } from '@vx/shape';
// import { appleStock } from '@vx/mock-data';
// import { curveMonotoneX } from '@vx/curve';
// import { LinearGradient } from '@vx/gradient';
// import { GridRows, GridColumns } from '@vx/grid';
// import { scaleTime, scaleLinear } from '@vx/scale';
// import { withTooltip, Tooltip } from '@vx/tooltip';
// import { localPoint } from '@vx/event';
// import { extent, max, bisector } from 'd3-array';
// import { timeFormat } from 'd3-time-format';
// import { csv } from 'd3-request';
// import population from './population1.csv'
// import _ from 'lodash'

// class Population22 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: []
//         }
//         // this.handleTooltip = this.handleTooltip.bind(this);

//     }

//     componentWillReceiveProps = (newProps) => {
//         csv(population, (data) => {
//                     var result = data.filter((x) => {
//                         return x['Country Name'] == newProps.country
//                     })
//                     console.log(result)
//                     if (result != '') {
//                     var result2 = Object.keys(result[0]).map(function (e) {
//                         return { year: e, population: result[0][e] }
//                     })
//                     var result3 = result2.slice(0, -5)
//                     this.setState({data: result3})
//                    }
//                 });

//             }

//      stock = this.state.data
//  formatDate = timeFormat("%b %d, '%y");

// // accessors
//  xStock = d => d.year;
//  yStock = d => d.population;
//  bisectDate = bisector(d => d.year).left;

//     render() {
//         console.log(this.stock)
//         const stock = this.stock
//         const xStock = this.xStock
//         const yStock = this.yStock
//         const bisectDate = this.bisectDate
//         const formatDate = this.formatDate

//         const {

//             showTooltip,
//             hideTooltip,
//             tooltipData,
//             tooltipTop,
//             tooltipLeft,
//             events,
//         } = this.props;

//         const width = 1000
//         const height = 500
//         const margin = 0

//         if (width < 10) return null;

//         // bounds
//         const xMax = width;
//         const yMax = height;

//         // scales
//         const xScale = scaleTime({
//             range: [0, xMax],
//             domain: extent(stock, xStock),
//         });
//         const yScale = scaleLinear({
//             range: [yMax, 0],
//             domain: [0, max(stock, yStock) + yMax / 3],
//             nice: true,
//         });

//         return (

//             <div>
//                 <svg ref={s => (this.svg = s)} width={width} height={height}>
//                     <rect
//                         x={0}
//                         y={0}
//                         width={width}
//                         height={height}
//                         fill="#32deaa"
//                         rx={14}
//                     />
//                     <defs>
//                         <linearGradient
//                             id="gradient"
//                             x1="0%"
//                             y1="0%"
//                             x2="0%"
//                             y2="100%"
//                         >
//                             <stop
//                                 offset="0%"
//                                 stopColor="#FFFFFF"
//                                 stopOpacity={1}
//                             />
//                             <stop
//                                 offset="100%"
//                                 stopColor="#FFFFFF"
//                                 stopOpacity={0.2}
//                             />
//                         </linearGradient>
//                     </defs>
//                     <GridRows
//                         lineStyle={{ pointerEvents: 'none' }}
//                         scale={yScale}
//                         width={xMax}
//                         strokeDasharray="2,2"
//                         stroke="rgba(255,255,255,0.3)"
//                     />
//                     <GridColumns
//                         lineStyle={{ pointerEvents: 'none' }}
//                         scale={xScale}
//                         height={yMax}
//                         strokeDasharray="2,2"
//                         stroke="rgba(255,255,255,0.3)"
//                     />
//                     <AreaClosed
//                         data={stock}
//                         xScale={xScale}
//                         yScale={yScale}
//                         x={xStock}
//                         y={yStock}
//                         strokeWidth={1}
//                         stroke={'url(#gradient)'}
//                         fill={'url(#gradient)'}
//                         curve={curveMonotoneX}
//                     />
//                     <Bar
//                         x={0}
//                         y={0}
//                         width={width}
//                         height={height}
//                         fill="transparent"
//                         rx={14}
//                         data={stock}
//                         onTouchStart={data => event =>
//                             this.handleTooltip({
//                                 event,
//                                 data,
//                                 xStock,
//                                 xScale,
//                                 yScale,
//                             })}
//                         onTouchMove={data => event =>
//                             this.handleTooltip({
//                                 event,
//                                 data,
//                                 xStock,
//                                 xScale,
//                                 yScale,
//                             })}
//                         onMouseMove={data => event =>
//                             this.handleTooltip({
//                                 event,
//                                 data,
//                                 xStock,
//                                 xScale,
//                                 yScale,
//                             })}
//                         onMouseLeave={data => event => hideTooltip()} */}
//                     {/* /> */}
//                     {/* {tooltipData && (
//                         <g>
//                             <Line
//                                 from={{ x: tooltipLeft, y: 0 }}
//                                 to={{ x: tooltipLeft, y: yMax }}
//                                 stroke="rgba(92, 119, 235, 1.000)"
//                                 strokeWidth={2}
//                                 style={{ pointerEvents: 'none' }}
//                                 strokeDasharray="2,2"
//                             />
//                             <circle
//                                 cx={tooltipLeft}
//                                 cy={tooltipTop + 1}
//                                 r={4}
//                                 fill="black"
//                                 fillOpacity={0.1}
//                                 stroke="black"
//                                 strokeOpacity={0.1}
//                                 strokeWidth={2}
//                                 style={{ pointerEvents: 'none' }}
//                             />
//                             <circle
//                                 cx={tooltipLeft}
//                                 cy={tooltipTop}
//                                 r={4}
//                                 fill="rgba(92, 119, 235, 1.000)"
//                                 stroke="white"
//                                 strokeWidth={2}
//                                 style={{ pointerEvents: 'none' }}
//                             />
//                         </g>
//                     )} */}
//                 </svg>
//                 {/* {tooltipData && (
//                     <div>
//                         <Tooltip
//                             top={tooltipTop - 12}
//                             left={tooltipLeft + 12}
//                             style={{
//                                 backgroundColor: 'rgba(92, 119, 235, 1.000)',
//                                 color: 'white',
//                             }}
//                         >
//                             {`$${yStock(tooltipData)}`}
//                         </Tooltip>
//                         <Tooltip
//                             top={yMax - 14}
//                             left={tooltipLeft}
//                             style={{
//                                 transform: 'translateX(-50%)',
//                             }}
//                         >
//                             {formatDate(xStock(tooltipData))}
//                         </Tooltip>
//                     </div> */}
//                 {/* )}
//             </div>
//         );
//     }
// }

// export default withTooltip(Area);

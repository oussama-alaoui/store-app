import React from "react";
import { View, Text, Dimensions } from "react-native";
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');



export default function Basic_00({alpha, number, w}) {
    const p_w = (width * w / 100)
    const p_h = ((width * w / 100) * 75) / 320
    return (

            <View
                style={{height:p_h}}
            >
                <WebView
                source={{ html: `
                    <html>
                        <body style="padding:0;margin:0;">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1604.99 369.35" width="`+p_w+`" height="`+p_h+`">
                            <defs>
                                <style>
                                    @import url('https://fonts.googleapis.com/css2?family=Cairo')
                                </style>
                                <style>
                                    .cls-1,
                                    .cls-10,
                                    .cls-12,
                                    .cls-7,
                                    .cls-9 {
                                        fill: none;
                                    }
                                    .cls-2 {
                                        clip-path: url('#clip-path');
                                    }
                                    .cls-3 {
                                        clip-path: url('#clip-path-2');
                                    }
                                    .cls-4 {
                                        fill: #fff;
                                    }
                                    .cls-5 {
                                        clip-path: url('#clip-path-3');
                                    }
                                    .cls-6 {
                                        clip-path: url('#clip-path-4');
                                    }
                                    .cls-10,
                                    .cls-12,
                                    .cls-7,
                                    .cls-9 {
                                        stroke: #000;
                                    }
                                    .cls-7 {
                                        stroke-width: 28px;
                                    }
                                    .cls-8 {
                                        clip-path: url('#clip-path-5');
                                    }
                                    .cls-9 {
                                        stroke-miterlimit: 3.99;
                                        stroke-width: 9.98px;
                                    }
                                    .cls-10 {
                                        stroke-miterlimit: 3.99;
                                        stroke-width: 8.98px;
                                    }
                                    .cls-11 {
                                        clip-path: url('#clip-path-6');
                                    }
                                    .cls-12 {
                                        stroke-miterlimit: 3.99;
                                        stroke-width: 9.98px;
                                    }
                                    .cls-13 {
                                        clip-path: url('#clip-path-7');
                                    }
                                    .cls-14 {
                                        clip-path: url('#clip-path-8');
                                    }
                                    .cls-15 {
                                        clip-path: url('#clip-path-9');
                                    }
                                    .cls-16 {
                                        clip-path: url('#clip-path-10');
                                    }
                                    .cls-17 {
                                        clip-path: url('#clip-path-11');
                                    }
                                    .cls-18 {
                                        fill: #b8b8b8;
                                    }
                                    .cls-19 {
                                        font-size: 125px;
                                        font-family: Cairo-Regular, Cairo;
                                    }
                                </style>
                                <clipPath id="clip-path" transform="translate(2.69 10.29)"><rect class="cls-1" x="11.31" y="3.71" width="1578.03" height="341.62"/></clipPath>
                                <clipPath id="clip-path-2" transform="translate(2.69 10.29)"><path class="cls-1" d="M40.26,3.71H1559.74a29,29,0,0,1,29,28.95V315.84a29,29,0,0,1-29,28.94H40.26a29,29,0,0,1-28.95-28.94V32.66A29,29,0,0,1,40.26,3.71"/></clipPath>
                                <clipPath id="clip-path-3" transform="translate(2.69 10.29)"><rect class="cls-1" x="11.31" y="3.71" width="1576.99" height="341.35"/></clipPath>
                                <clipPath id="clip-path-4" transform="translate(2.69 10.29)"><path class="cls-1" d="M40.25,3.71H1559.36a29,29,0,0,1,29,29V316.09a29,29,0,0,1-29,29H40.25a29,29,0,0,1-28.94-29V32.68a29,29,0,0,1,28.94-29"/></clipPath>
                                <clipPath id="clip-path-5" transform="translate(2.69 10.29)"><rect class="cls-1" x="909.33" y="117.33" width="689.15" height="118.67"/></clipPath>
                                <clipPath id="clip-path-6" transform="translate(2.69 10.29)"><rect class="cls-1" x="1.52" y="116" width="782.48" height="116"/></clipPath>
                                <clipPath id="clip-path-7" transform="translate(2.69 10.29)"><rect class="cls-1" x="797.41" y="38.99" width="93.26" height="100.81"/></clipPath>
                                <clipPath id="clip-path-8" transform="translate(2.69 10.29)"><rect class="cls-1" x="869.02" y="254.38" width="51.3" height="51.3"/></clipPath>
                                <clipPath id="clip-path-9" transform="translate(2.69 10.29)"><path class="cls-1" d="M894.67,254.38A25.65,25.65,0,1,0,920.32,280a25.65,25.65,0,0,0-25.65-25.65"/></clipPath>
                                <clipPath id="clip-path-10" transform="translate(2.69 10.29)"><rect class="cls-1" x="765.96" y="265.01" width="78.6" height="29.66"/></clipPath>
                                <clipPath id="clip-path-11" transform="translate(2.69 10.29)"><path class="cls-1" d="M771,265h68.6a5,5,0,0,1,5,5v20.07a5,5,0,0,1-5,5H771a5,5,0,0,1-5-5V270a5,5,0,0,1,5-5"/></clipPath>
                            </defs>
                            <title>numbers</title>
                            <g class="cls-2">
                                <g class="cls-3"><path class="cls-4" d="M11.31,3.71H1588.23v340.6H11.31Z" transform="translate(2.69 10.29)"/></g>
                            </g>
                            <g class="cls-5">
                                <g class="cls-6"><path class="cls-7" d="M40.25,3.71H1559.36a29,29,0,0,1,29,29V316.09a29,29,0,0,1-29,29H40.25a29,29,0,0,1-28.94-29V32.68a29,29,0,0,1,28.94-29" transform="translate(2.69 10.29)"/></g>
                            </g>
                            <g class="cls-8"><path class="cls-9" d="M966.1,175.09l613.83,4.14" transform="translate(2.69 10.29)"/></g><path class="cls-10" d="M727,337.66V10.28" transform="translate(2.69 10.29)"/><path class="cls-10" d="M966.06,337.66V10.28" transform="translate(2.69 10.29)"/><g class="cls-11"><path class="cls-12" d="M18.36,172.93,727,174.25" transform="translate(2.69 10.29)"/></g>
                            <g class="cls-13"><path d="M840.19,39.38a6.22,6.22,0,0,0-3.38,2.21c-.29.6-.13,1.14.33,1.14a2.41,2.41,0,0,1,1.3.69,2.44,2.44,0,0,1,.71,1.72l.07.71-.84-.86a10.48,10.48,0,0,0-4.49-2.74,13.27,13.27,0,0,0-4.06-.67,14.82,14.82,0,0,0-7.52,1.61c-1.45.73-3.13,2-3.25,2.38-.18.65.53,1.19,1.58,1.2a1.87,1.87,0,0,0,1.3-.45,13.55,13.55,0,0,1,6.88-2.21c1.2,0,1.4,0,1.4.34,0,.48.77.84,1.75.84a5.94,5.94,0,0,1,4.11,1.8,28.13,28.13,0,0,1,3,3.82.18.18,0,0,1-.1.22c-.17.07-.45-.23-1.07-1.11a13.83,13.83,0,0,0-2.82-2.74,11.3,11.3,0,0,0-6.39-1.89,10.62,10.62,0,0,0-8,3.22c-.92,1-1.42,1.87-1.33,2.38a.79.79,0,0,0,.84.7c.31,0,.47-.12,1.56-1.18,1.77-1.72,2.67-2.09,4.63-1.86,1.4.15,2.11.35,2.42.68l.26.27-.3.16a1.74,1.74,0,0,1-.72.16,16.28,16.28,0,0,0-3.08.44,10.53,10.53,0,0,0-3.12,1.4,17.44,17.44,0,0,0-3.12,3c-.52.65-.59.77-.59,1.18,0,1.23,1,1.41,2,.36a17.52,17.52,0,0,1,4.31-3.19c.61-.31.62-.31.55-.08-.17.59-.17.86,0,1.11s.7.33,1.2,0a6.74,6.74,0,0,1,4.78-1,8.26,8.26,0,0,1,2.39,1.11l.28.24-.72-.19a11,11,0,0,0-5-.13,10.16,10.16,0,0,0-3,1.45,13.83,13.83,0,0,0-4.2,5.92,20.1,20.1,0,0,0-1.38,4.62c.15.72.67,1.05,1.26.81s.58-.44.94-1.83c.18-.68.33-1.25.34-1.25s.15,0,.3.09c.64.23.85,0,1.82-1.64a10.36,10.36,0,0,1,1-1.31,6.54,6.54,0,0,1,4.38-2.06,9.27,9.27,0,0,1,1.05-.11s-.43.38-1,.81c-2.8,2.2-5.91,5.9-6.5,7.72a8.2,8.2,0,0,0-.47,3.06,12.09,12.09,0,0,0,.72,4c.34,1.2.43,1.43.72,1.7a.75.75,0,0,0,1.32-.18c.17-.26.17-.46.14-1.69-.18-4.54,1.2-7.67,4.58-10.38.52-.43,1.76-1.35,2.76-2.07s2.16-1.58,2.58-2a3.88,3.88,0,0,1,1.27-.79,1.36,1.36,0,0,1,.54-.1s-1.09.9-2.48,1.94a34.36,34.36,0,0,0-3.09,2.53,8.17,8.17,0,0,0-1.69,2.92,5.62,5.62,0,0,0-.35,2.37,8.22,8.22,0,0,0,.15,2.31c.2.89,1.59,5.76,1.85,6.47.2.54.64,1,.94,1s.65-.36.85-.75c.1-.21.3-4.93.31-7.5v-.8H834a.77.77,0,0,0,.65-.29l.29-.29v-1.7a6.34,6.34,0,0,1,.3-2.53,6.93,6.93,0,0,1,.69-1.39,15.76,15.76,0,0,1,1.87-2.27.65.65,0,0,1,.29.13c.16.11.13.19-.33,1a26.53,26.53,0,0,0-3.11,9.07c-.32,2.25-.25,6.43.11,7.15a.79.79,0,0,0,1.35.29c.34-.3.29,0,.53-3.33l.05-.69.34.22c.41.29,1.16.43,1.36.26.41-.35.22-1.13-.6-2.43a8.62,8.62,0,0,1-.52-.9s.17,0,.4,0a1.94,1.94,0,0,0,.76,0c.48-.13.46,0,.65-2.83s.52-4.08,1.32-5.13l.18-.25.41.27c.3.2.4.33.4.54s0,.5.06.78l.07.52h-.71a1.64,1.64,0,0,0-.69.08,4.33,4.33,0,0,0,.63.7l.64.63V68.4l-.36.06a6.86,6.86,0,0,1-.82.06h-.44l.81.79c.8.78.81.78.81,1.27v.49H840l.69.73.71.73v.69c0,.81,0,.81-1,.81h-.7l.8.75.8.77.06.9.07.92h-.71a1.64,1.64,0,0,0-.69.08,4.65,4.65,0,0,0,.63.71l.64.63v1.53h-.78a3,3,0,0,0-.79,0,11.1,11.1,0,0,0,.79.8l.78.76V83l-.64-.07a1.84,1.84,0,0,0-.63,0,5.16,5.16,0,0,0,.63.77l.64.7v1.44h-.78a2.1,2.1,0,0,0-.79.08,5.63,5.63,0,0,0,.79.79c.83.76.88.87.73,1.69l-.08.31-.66,0a2,2,0,0,0-.68,0,8.5,8.5,0,0,0,.69.94l.69.87,0,.58,0,.6-.71,0a3,3,0,0,0-.72.09s.32.4.69.83l.69.76v1.5h-.74a2.66,2.66,0,0,0-.74,0,10.32,10.32,0,0,0,.84,1l.83.93v.57a3.52,3.52,0,0,0,.06.74c0,.14,0,.16-.74.16h-.82l.81.84.79.83v.69c0,.67,0,.69-.24.69a.41.41,0,0,1-.34-.18c-.08-.14-.1-.14-.11,0s-.08.15-.49.11-.49,0-.49,0a6.33,6.33,0,0,0,.53.78l.52.71.1,1.48c.05.8.09,1.48.08,1.49a6.55,6.55,0,0,1-.6-.84,12.31,12.31,0,0,0-2.38-2.6,1.47,1.47,0,0,0-.45-.25s.47.93,1.09,2a20.3,20.3,0,0,1,1.09,2,5.2,5.2,0,0,1-.77-.42,14.58,14.58,0,0,0-4-1.75c-.17,0,.14.31,1,1.15a12,12,0,0,1,1.59,1.79,4.93,4.93,0,0,1,.35.67s-.26-.05-.57-.2a9.59,9.59,0,0,0-3.57-1c-.19,0,0,.18.88.72a7,7,0,0,1,2.42,2.12c.22.41.4.54-1.69-1.21-.82-.68-1.91-1.55-2.41-1.93a27,27,0,0,0-34.36.51,2.34,2.34,0,0,0-.56.52s1.73-.28,3.79-.69a63.43,63.43,0,0,1,11-1.58,27.88,27.88,0,0,1,15.1,3.74c3.12,1.84,4.45,2.93,8.58,7.07,3.46,3.48,3.48,3.51,3.29,3.7s-1.38,1.19-2.84,2.42l-2.64,2.22-1-1.08c-1.1-1.17-1.41-1.35-2.15-1.26a1.48,1.48,0,0,0-1.22.9c-.29.86.34,1.87,1.73,2.82,1,.68,1.15,1.17.55,2-.29.38-5.07,5.59-5.53,6l-.28.27-.52-.21a2.93,2.93,0,0,0-3,.78,2.16,2.16,0,0,0-.67,1.73c0,2.78,4,4.49,6.72,2.89a41.26,41.26,0,0,0,3.16-3.14c1.49-1.58,3.11-3.28,3.59-3.78.65-.7.93-.92,1.18-1,.58-.1,1.09.11,1.92.81s1.22.91,1.8.91a1.27,1.27,0,0,0,1.37-1.19c0-.71-.33-1.11-1.84-2.19a8.09,8.09,0,0,1-.81-.64s1.14-1.2,2.54-2.6l2.52-2.53,2.56,2.56c1.39,1.4,2.52,2.57,2.5,2.59l-1.11.79c-1.25.92-1.55,1.28-1.61,1.92a.82.82,0,0,0,.17.74,1.64,1.64,0,0,0,1.89.42,6,6,0,0,0,1.1-.79c1.2-1,1.89-1.08,2.63-.33l3.58,3.76c3.35,3.55,3.69,3.85,4.79,4.14a4.77,4.77,0,0,0,5.33-2.19,2.74,2.74,0,0,0,.06-2.24,3,3,0,0,0-3.51-1.45l-.59.2-.28-.31a79.4,79.4,0,0,1-5.72-6.42c-.18-.43-.18-.46,0-.77a3,3,0,0,1,.81-.75,3.27,3.27,0,0,0,1.77-2.31,1.5,1.5,0,0,0-2.1-1.33,8.2,8.2,0,0,0-1.31,1.19l-1,1.07-2.82-2.38-2.83-2.39,3.67-3.68a58,58,0,0,1,4.78-4.52,28.11,28.11,0,0,1,14.14-6,39.82,39.82,0,0,1,7.33,0c2,.22,4.68.67,8.69,1.49,1.76.35,3.24.63,3.31.62.3-.07-3.11-2.45-5-3.51a29.54,29.54,0,0,0-9.49-3.23,34.44,34.44,0,0,0-7.32,0,29.48,29.48,0,0,0-13.16,5.76c-.48.36-3.19,2.61-6,5s-5.18,4.35-5.22,4.34-1.55-1.27-3.35-2.79L837.65,110l6.64,0,6.63,0,0-.6a5.15,5.15,0,0,1,.6-2.3,14.31,14.31,0,0,1,2.3-3.24,9.23,9.23,0,0,0,1-1.3,8.91,8.91,0,0,0-2.55,1.41,10.48,10.48,0,0,0-2,2l-.19.25.06-.3a11.3,11.3,0,0,1,.39-1.11c.18-.45.33-.83.33-.86s-.55.18-1,.5a6,6,0,0,0-1.11,1.29,4,4,0,0,1-.65.85,8.62,8.62,0,0,1,.76-2.12,4.62,4.62,0,0,1,1.52-1.71c.4-.2.34-.28-.21-.2a4,4,0,0,0-2.76,1.82l-.73,1c-.15.18-.16.17-.1-.35a6.62,6.62,0,0,1,1.75-3.42c.52-.53.49-.6-.18-.35a6.77,6.77,0,0,1-1.35.18l-1,.05V100l.81-.8.81-.82h-1.62V97l.9-1,.91-1-.76,0-.75,0V93.38l.68-.76a6.4,6.4,0,0,0,.69-.81,3.26,3.26,0,0,0-.71-.08l-.71,0L846,90.46l.69-.86c.38-.49.69-.89.69-.91a3.26,3.26,0,0,0-.73,0l-.74,0V87.45l.78-.75a3.07,3.07,0,0,0,.71-.79,2.91,2.91,0,0,0-.77-.06h-.72V84.31l.64-.63a4,4,0,0,0,.64-.72,1.61,1.61,0,0,0-.66,0l-.67,0,0-.54c0-.53,0-.55.84-1.3l.79-.76h-1.72V78.94l.7-.76.7-.75-.7,0-.7,0V75.62l.82-.79.8-.79h-.66c-1,0-1,0-1-.83V72.5l.64-.63a4.5,4.5,0,0,0,.64-.71,1.43,1.43,0,0,0-.64-.08h-.64v-1l.81-.76.81-.76H847a5.73,5.73,0,0,1-.81-.06l-.31-.06V67l.65-.73.65-.73h-1.4v-.72c0-.78,0-.83.42-1.08s.26-.16.45.11c.61.86.86,1.9,1,4.3.08,1,.19,2.21.26,2.63l.1.76.38.1a2.7,2.7,0,0,0,.82,0l.46-.07-.43.68a4.4,4.4,0,0,0-1,2.14c0,.62.15.73.85.58a1.93,1.93,0,0,0,.77-.32l.22-.2.06.22a8,8,0,0,1,.07,1c0,.43,0,1.18.08,1.66.07.82.1.9.39,1.16.49.44,1,.32,1.34-.32a15.52,15.52,0,0,0,.32-4.47,23.41,23.41,0,0,0-1.32-7.38,32.69,32.69,0,0,0-2.19-4.75l-.31-.51.27-.14c.26-.13.28-.13.86.59,1.93,2.36,2.26,3.26,2.21,5.92l0,1.31.31.3a.79.79,0,0,0,.65.32c.31,0,.35,0,.35.24s.07,1.94.14,4a20.15,20.15,0,0,0,.28,4c.5.93,1.09,1,1.58.11.26-.44,1.94-6.2,2.13-7.25a13.41,13.41,0,0,0,0-3.35c-.4-2.19-1.57-3.88-3.89-5.56-1.44-1-3.59-2.74-3.54-2.77a1.16,1.16,0,0,1,.45.06,5,5,0,0,1,1.42.92c.54.45,1.69,1.32,2.56,1.94,3.67,2.62,5,4,6.06,6a11,11,0,0,1,1.12,5.54,21.62,21.62,0,0,0,.09,2.28,1.4,1.4,0,0,0,.84.7,1.11,1.11,0,0,0,.53-.33c.29-.26.41-.5.69-1.46a15.63,15.63,0,0,0,.81-3.82,8,8,0,0,0-1.33-5.1,27.38,27.38,0,0,0-5.44-5.9c-.64-.53-1.11-1-1-1a12,12,0,0,1,2.83.51A7,7,0,0,1,863.36,63c.27.52.75,1,1,1a1.14,1.14,0,0,0,.42-.14l.28-.14.32,1.3c.28,1.14.35,1.33.65,1.61a.78.78,0,0,0,1.21.07c.5-.41.49-.74,0-2.44-1.33-4.24-2.8-6.78-4.9-8.47a8.09,8.09,0,0,0-5.93-1.89,12.39,12.39,0,0,0-2.73.41c-.28.06-.28.06.09-.2a7.27,7.27,0,0,1,2.46-1,6.9,6.9,0,0,1,4.41.94c.88.6,1.52.39,1.41-.46a2.7,2.7,0,0,0-.11-.6c-.08-.16,0-.15.44.08a16.19,16.19,0,0,1,4,2.85c1,.92,1.15,1,1.61,1a.94.94,0,0,0,.73-1.4,15.86,15.86,0,0,0-2.48-2.88A10.92,10.92,0,0,0,859.5,50c-1.51-.1-1.83-.27-1.35-.7a7.9,7.9,0,0,1,4-.61c1.07.14,1.6.47,3,1.83,1.11,1.07,1.29,1.21,1.59,1.21a.77.77,0,0,0,.85-.83A3.19,3.19,0,0,0,866.6,49a10.13,10.13,0,0,0-5.4-3.26,13.41,13.41,0,0,0-4.81-.19,11.41,11.41,0,0,0-7.79,5.1c-.19.29-.38.47-.5.47-.3,0-.25-.34.13-.76.18-.2.5-.62.72-.92,2-2.86,3.9-4.12,6.08-4.13a3.73,3.73,0,0,0,.92-.1c.4-.11.89-.56.89-.8s.36-.31,1.75-.25a12.57,12.57,0,0,1,6.11,2,2.83,2.83,0,0,0,1.54.61c1,.08,1.71-.31,1.71-1,0-.37-.21-.59-1.31-1.36A15.29,15.29,0,0,0,851.5,43a8.64,8.64,0,0,0-2.78,2l-.91.92V45.4a2.5,2.5,0,0,1,1.9-2.59c.65-.18.8-.58.46-1.26-.45-.87-2.39-2-3.95-2.28-.49-.1-.59-.09-.82,0a9,9,0,0,0-1.62,2.5l-.26.71c0,.09-.13-.06-.27-.39a13.1,13.1,0,0,0-1.16-2.2c-.48-.74-.49-.75-.9-.74A4.34,4.34,0,0,0,840.19,39.38Z" transform="translate(2.69 10.29)"/></g>
                            <g class="cls-14">
                                <g class="cls-15"><path d="M869,254.38h51.3v51.3H869Z" transform="translate(2.69 10.29)"/></g>
                            </g>
                            <g class="cls-16">
                                <g class="cls-17"><path class="cls-18" d="M766,265h78.6v29.47H766Z" transform="translate(2.69 10.29)"/></g>
                            </g><path d="M805.21,149.4a1.5,1.5,0,0,0,1.5,1.5,1.47,1.47,0,0,0,1.5-1.5,1.5,1.5,0,1,0-3,0Zm3.23,0a1.5,1.5,0,0,0,1.5,1.5,1.47,1.47,0,0,0,1.5-1.5,1.5,1.5,0,1,0-3,0Zm4.92,10.14v-2.42a4.93,4.93,0,0,0-2.44-4.47,5.07,5.07,0,0,0-2.6-.65,4.85,4.85,0,0,0-4.47,2.46,5.54,5.54,0,0,0-.65,2.66,4.75,4.75,0,0,0,2.39,4.48,5,5,0,0,0,2.51.67h.11v-2.73h.23a2.58,2.58,0,0,1,0-5.15,2.32,2.32,0,0,1,2.24,1.48v6.4H815v-2.73Z" transform="translate(2.69 10.29)"/><path d="M815.15,164.91a1.5,1.5,0,0,0,1.5,1.5,1.47,1.47,0,0,0,1.5-1.5,1.5,1.5,0,1,0-3,0Zm3.24,0a1.49,1.49,0,0,0,1.48,1.5,1.47,1.47,0,0,0,1.5-1.5,1.49,1.49,0,1,0-3,0ZM819.71,152v7.56H814.3v2.73h6.78a1.23,1.23,0,0,0,1.32-1.16V152Z" transform="translate(2.69 10.29)"/><path d="M824.64,162.27h5.88a1.2,1.2,0,0,0,1.15-1.16v-2a7.16,7.16,0,0,0-3-6.23,6,6,0,0,0-3.23-.89v2.68a3.7,3.7,0,0,1,3.25,2c.17.36.31.76.31,2.93h-4.36Z" transform="translate(2.69 10.29)"/><path d="M846,159.54h-1.9l0-2.42a4.91,4.91,0,0,0-2.44-4.47A5,5,0,0,0,839,152a4.86,4.86,0,0,0-4.48,2.46,5.54,5.54,0,0,0-.65,2.66,4.76,4.76,0,0,0,2.4,4.48,5,5,0,0,0,2.5.67h2.6c.07,1.61-1.72,2.51-3.24,2.51h-2.29v2.73h2.29c3.53,0,6-1.74,6-5.1v-.14H846Zm-4.61,0h-2.24a2.58,2.58,0,0,1,0-5.15,2.31,2.31,0,0,1,2.24,1.48Z" transform="translate(2.69 10.29)"/><path d="M859.51,159.54a12,12,0,0,1-4.21-.49l2.68-3.16c.07-3-1.63-4.36-4.74-4.36a11.27,11.27,0,0,0-6.25,1.7v2.28l4.26,3.52h0a20,20,0,0,1-5.75.51v2.73c3.4,0,5.66,0,7.67-1.27,1.75,1.27,3.36,1.27,6.3,1.27Zm-9.52-5a9.87,9.87,0,0,1,3.25-.6,1.43,1.43,0,0,1,1.5,1.68h0l-1.63,1.75Z" transform="translate(2.69 10.29)"/><path d="M874.77,159.54V152h-2.68v7.56h-2.38V153.1H867v6.44h-2.35V153.1H862v6.44h-2.94v2.73h17.62v-2.73Z" transform="translate(2.69 10.29)"/><path d="M876.22,162.27h3.43a1.33,1.33,0,0,0,1.34-1.36v-14H878.3v12.67h-2.08Z" transform="translate(2.69 10.29)"/><path d="M883.22,162.27h2.67v-15.4h-2.67Z" transform="translate(2.69 10.29)"/><path d="M780.11,186.33v43.88h9.5V217.08l8-8.84,12.67,22h12.34l-18.41-28.63,14.19-15.18H805.58l-16,17.55V186.33Z" transform="translate(2.69 10.29)"/><path d="M844.38,186.4c-9.64,0-17.23,4.29-17.23,13.2,0,10.55,10.76,13.06,17.29,13.06H849c7.65,0,7.59,8.58,0,8.58h-4.62c-5.28,0-8-.92-9.31-5.88l-9.43.07c1.58,10.43,7.32,14.78,18.74,14.78H849c19.79,0,20-26.46,0-26.46h-4.62c-4.62,0-8.12-.2-8.12-4.09s5.08-4.29,8.12-4.29h3c2,0,4.36,1.72,5.28,4.23h9.77c-.8-6.67-5.74-13.2-15.05-13.2Z" transform="translate(2.69 10.29)"/><path d="M885,186.4l-18.41,43.81h10.09l3.9-10.75h18.93l4.09,10.75h10.36L895.05,186.4Zm11.41,25.14H883.5l6.41-14.12Z" transform="translate(2.69 10.29)"/>
                            
                            <g>
                                <rect x="27" y="27" width="700" height="155" style="fill:transparent;opacity:.5"/>
                                <text
                                    id="arabic-number"
                                    class="cls-19"
                                    style="letter-spacing: 75px;"
                                    x="410"
                                    y="112"
                                    dominant-baseline="middle"
                                    text-anchor="middle"
                                >
                                    
                                </text>
                            </g>
                            <g>
                                <rect x="975" y="27" width="605" height="155" style="fill:transparent;opacity:.5"/>
                                <text
                                    id="arabic-alpha"
                                    class="cls-19"
                                    style="letter-spacing: 35px;font-size:100px"
                                    x="1320"
                                    y="112"
                                    dominant-baseline="middle"
                                    text-anchor="middle"
                                >
                        
                                </text>
                            </g>
                            <g>
                                <rect x="27" y="187" width="700" height="155" style="fill:transparent;opacity:.5"/>
                                <text
                                    id="english-number"
                                    class="cls-19"
                                    style="letter-spacing: 75px;"
                                    x="410"
                                    y="272"
                                    dominant-baseline="middle"
                                    text-anchor="middle"
                                >
                                    
                                </text>
                            </g>
                            <g>
                                <rect x="975" y="187" width="605" height="155" style="fill:transparent;opacity:.5"/>
                                <text
                                    id="english-alpha"
                                    class="cls-19"
                                    style="letter-spacing: 75px;"
                                    x="1320"
                                    y="272"
                                    dominant-baseline="middle"
                                    text-anchor="middle"
                                >
                                    
                                </text>
                            </g>
                        
                            <script>
                                function toArabicNumber(strNum) {
                                    var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
                                    var en = '0123456789'.split('');
                                    strNum = strNum.replace(/[0123456789]/g, x => ar[en.indexOf(x)]);
                                    return strNum;
                                }
                        
                        
                        
                                function toArabicAlpha(strAlpha) {
                                    var ar = 'أبحدرسصطعقكلمنهوى'.split('');
                                    var en = 'ABJDRSXTEGKLZNHUV'.split('');
                                    strAlpha = strAlpha.replace(/[ABJDRSXTEGKLZNHUV]/g, x => ar[en.indexOf(x)]);
                                    strAlpha = strAlpha.split("").reverse().join("")
                                    strAlpha = strAlpha.match(/.{0,1}/g);
                                    strAlpha = strAlpha.join(" ");
                                    return strAlpha;
                                }
                        
                                let number = '`+number+`'
                                document.getElementById("english-number").innerHTML = number;
                                document.getElementById("arabic-number").innerHTML = toArabicNumber(number);
                        
                        
                                let alpha = '`+alpha+`'
                                document.getElementById("english-alpha").innerHTML = alpha.toUpperCase();
                                document.getElementById("arabic-alpha").innerHTML = toArabicAlpha(alpha.toUpperCase());
                        
                            </script>
                        </svg>
                    </body>
                </html>`
                }}
                    scalesPageToFit={false}
                    originWhitelist={['*']}
                    domStorageEnabled={true}
                    style={{
                        width: p_w,
                    }}
                    scrollEnabled={false}
                />
            </View>
            // <WebView
            //   scalesPageToFit={false}
            //    originWhitelist={['*']}
            //    domStorageEnabled={true}
            //    source={{uri: url}}
            //    style={{
            //     width: width * 30 / 100,
            //     height: ((width * 30 / 100) * 75)/320,
            //   }}
            // />
    )
}
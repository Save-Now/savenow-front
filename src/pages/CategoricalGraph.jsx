import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components"
import { ResponsivePie } from '@nivo/pie';

const BASE_URL = 'https://71c13204-cc41-4566-a89f-cf9b87467725.mock.pstmn.io'

const Container = styled.div`
    border-radius: ${({ theme }) => theme.border.radius};
    padding: 20px;
    background: #FFFFFF;
    grid-row-start: 1;
    grid-row-end: 5;
`
const Title = styled.div`
    font-weight: ${({ theme }) => theme.fontWeight.bold}
`

export default function CategoricalGraph({ date }) {
    const [spendings, setSpendings] = useState([]);
    const [chartData, setChartData] = useState([]);
    const { today, year, month, day } = { date };

    const getData = async () => {
        const response = await axios.get(`${BASE_URL}/api/records/categoricalSpending`);
        // console.log(typeof response.data);  //object(Array)
        const categoricalSpending = response.data;
        console.log(categoricalSpending)
        const temp = categoricalSpending.map(spend => {
            return {
                "id": spend.category,
                "label": spend.category,
                "value": spend.value,
                "color": `rgba(70, 89, 228, ${1 / spend.rank})`,
            }
        })
        setChartData(temp);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(chartData);
    }, [chartData])

    return (
        <Container>
            <Title>카테고리별 소비분석</Title>
            <ResponsivePie
                data={chartData}
                margin={{ top: 50, right: 120, bottom: 30, left: 0 }}
                innerRadius={0.7}
                padAngle={0}
                borderWidth={0}
                colors={chartData.map((data) => data.color)}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                legends={[
                    {
                        anchor: 'right', // 위치
                        direction: 'column', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 125, // chart와 X 간격
                        translateY: 0, // chart와 Y 간격
                        itemsSpacing: 5, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 18, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 1, // item opacity
                        symbolSize: 10, // symbol (색상 표기) 크기
                        symbolShape: 'square', // symbol (색상 표기) 모양
                    },
                ]}
            />
        </Container>
    )
}
import React from 'react'
import styled from 'styled-components'
import data from '~/constants/my.json'

const MainTitle = styled.div`
  font-size: 10vw;
  margin: 12% auto;
  text-shadow: 0 0 10px #000, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px lime, 0 0 70px lime,
    0 0 80px lime, 0 0 100px lime, 0 0 150px lime;
  font-weight: 300;
  margin-bottom: 1rem;
  text-align: center;
  color: #cfc;
  font-family: 'Bungee Outline', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  -webkit-font-smoothing: initial;
`

const SubTitle = styled.div`
  text-shadow: 0 0 10px #000, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px lime, 0 0 70px lime,
    0 0 80px lime, 0 0 100px lime, 0 0 150px lime;
  font-weight: 100;
  text-align: center;
  font-size: 4vw;
  color: #cfc;
  font-family: 'Bungee Hairline', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  margin: 8% 0;
`

const Email = styled.div`
  font-weight: 100;
  text-align: center;
  font-size: 2vw;
  color: #cfc;
  font-family: 'Quicksand', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  margin: 2% 0;
`

export default () => (
  <>
    <MainTitle>{data.title}</MainTitle>
    <SubTitle>
      {data.org}
      <br />
      <br />
      {data.student_num} {data.name_en}
    </SubTitle>
    <Email>Email: {data.email}</Email>
  </>
)

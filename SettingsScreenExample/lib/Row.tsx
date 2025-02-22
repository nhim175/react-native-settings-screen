import * as React from 'react'
import { StyleSheet, View, TouchableOpacity, TextStyle, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { Chevron } from './Chevron'

export interface RowData {
  rowStyle?: ViewStyle
  rowBorderStyle?: ViewStyle
  title: string
  titleStyle?: TextStyle
  subtitle?: string
  subtitleStyle?: TextStyle
  onPress?: () => void
  showDisclosureIndicator?: boolean
  renderAccessory?: () => React.ReactElement<any>
}

export interface Props extends RowData {
  titleStyles?: (TextStyle | undefined)[]
  subtitleStyles?: (TextStyle | undefined)[]
  isFirst: boolean
  isLast: boolean
  children?: any
}
export const Row = ({
  title,
  subtitle,
  onPress,
  showDisclosureIndicator,
  renderAccessory,
  
  rowStyle = {},
  rowBorderStyle = {},
  titleStyles,
  subtitleStyles,
  isFirst,
  isLast,
}: Props) => {
  let ContentContainer = onPress ? TouchableOpacity : View

  return (
    <Container height={subtitle ? 56 : 46}>
      <TopBorderContainer isFirst={isFirst} style={{
        backgroundColor: rowStyle.backgroundColor || '#fff'
      }}>
        <TopBorder style={rowBorderStyle} />
      </TopBorderContainer>
      <ContentContainer style={[styles.contentContainer, rowStyle]} onPress={onPress}>
        <TitlesContainer>
          <View />
          <Title numberOfLines={1} style={titleStyles}>
            {title}
          </Title>
          {subtitle && (
            <Subtitle numberOfLines={1} style={subtitleStyles}>
              {subtitle}
            </Subtitle>
          )}
          <View />
        </TitlesContainer>
        {renderAccessory && renderAccessory()}
        {showDisclosureIndicator ? <Chevron style={{tintColor: '#999'}} /> : <View style={{ width: 10 }} />}
      </ContentContainer>
      {isLast && <BottomBorder style={rowBorderStyle} />}
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

interface ContainerProps {
  height: number
}
const Container = styled.View<ContainerProps>`
  background-color: transparent;
  height: ${p => p.height};
  align-items: stretch;
`

interface TopBorderContainerProps {
  isFirst: boolean
}
const TopBorderContainer = styled.View<TopBorderContainerProps>`
  align-self: stretch;
  height: ${StyleSheet.hairlineWidth};
  padding-left: ${p => (p.isFirst ? 0 : 15)};
`

const TopBorder = styled.View`
  flex: 1;
  background-color: #ccc;
`

const TitlesContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-self: stretch;
`

const Title = styled.Text`
  color: black;
  font-size: 18;
  margin-right: 15;
`

const Subtitle = styled.Text`
  color: #999;
  font-size: 15;
  margin-right: 15;
`

const BottomBorder = styled.View`
  align-self: stretch;
  height: ${StyleSheet.hairlineWidth};
  background-color: #ccc;
`

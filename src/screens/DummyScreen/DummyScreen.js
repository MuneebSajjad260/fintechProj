import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Frame from '../../shared/components/core/Frame';
//* Chart Deps
import {BarChart, LineChart} from 'react-native-gifted-charts';

const DummyData = {
  statusCode: 200,
  data: {
    teamExpense: [
      {
        x: {
          isoyear: 2023,
          'week of year': 20,
        },
        y: 60,
      },
      {
        x: {
          isoyear: 2023,
          'week of year': 25,
        },
        y: 50,
      },
      {
        x: {
          isoyear: 2023,
          'week of year': 29,
        },
        y: 21,
      },
      {
        x: {
          isoyear: 2023,
          'week of year': 30,
        },
        y: 40,
      },
      {
        x: {
          isoyear: 2023,
          'week of year': 31,
        },
        y: 0,
      },
      {
        x: {
          isoyear: 2023,
          'week of year': 32,
        },
        y: 0,
      },
    ],
  },
};

const DummyDataStackedChart = {
  statusCode: 200,
  data: {
    teamMemberCreditsUse: [
      {
        x: 'Maaz',
        y: 180,
        resourceType: 'Meeting Rooms',
      },
      {
        x: 'Taha',
        y: 60,
        resourceType: 'Meeting Rooms',
      },
      {
        x: 'Hiz',
        y: 120,
        resourceType: 'Focus pod',
      },
      {
        x: 'Taha',
        y: 60,
        resourceType: 'Shared Space',
      },
      {
        x: 'Hiz',
        y: 120,
        resourceType: 'Focus pod',
      },
      {
        x: 'Maaz',
        y: 100,
        resourceType: 'Shared Space',
      },
      {
        x: 'Valid',
        y: 40,
        resourceType: 'Meeting Rooms',
      },
      {
        x: 'Jamil',
        y: 120,
        resourceType: 'Meeting Rooms',
      },
    ],
  },
};

const stackBottomGuide = [
  {name: 'Meeting Rooms', color: '#F99B1F'},
  {name: 'Shared Space', color: '#00B3A5'},
  {name: 'Focus pod', color: '#00B517'},
];

const DummyScreen = () => {
  function transformData(data) {
    return data.map(item => ({
      value: item.y,
      label: `Week ${item.x['week of year']}`,
    }));
  }

  function transformTeamMemberData(apiData) {
    const colorMap = {
      'Meeting Rooms': '#F99B1F',
      'Shared Space': '#00B3A5',
      'Focus pod': '#00B517',
    };

    const groupedData = apiData.reduce((result, item) => {
      const existingEntry = result.find(entry => entry.label === item.x);

      if (existingEntry) {
        existingEntry.stacks.push({
          value: item.y,
          color: colorMap[item.resourceType],
          marginBottom: 2,
        });
      } else {
        result.push({
          label: item.x,
          stacks: [{value: item.y, color: colorMap[item.resourceType]}],
        });
      }

      return result;
    }, []);

    return groupedData;
  }

  const stackData = transformTeamMemberData(
    DummyDataStackedChart.data.teamMemberCreditsUse,
  );
  const lineData = transformData(DummyData.data.teamExpense);

  return (
    <Frame style={{padding: 16}}>
      <View>
        <LineChart
          initialSpacing={40}
          data={lineData}
          data2={lineData}
          color2={'#00B3A530'}
          thickness2={24}
          spacing={80}
          thickness={8}
          hideRules
          hideOrigin
          showVerticalLines={false}
          verticalLinesColor="#ECECEC80"
          xAxisColor="transparent"
          yAxisColor="transparent"
          noOfSections={5}
          color="#00B3A5"
          curved
          customDataPoint={() => {
            return (
              <View
                style={{
                  backgroundColor: '#00B3A5',
                  height: 18,
                  width: 18,
                  borderRadius: 100 / 2,
                  borderWidth: 3,
                  borderColor: '#FFFFFF',
                  position: 'absolute',
                  top: 0,
                }}
              />
            );
          }}
        />
      </View>

      <View style={{marginTop: 64}}>
        <BarChart
          isAnimated
          noOfSections={4}
          stackData={stackData}
          showLine={false}
          disablePress
          barBorderRadius={6}
          spacing={40}
          hideRules
          hideOrigin
          xAxisColor="transparent"
          yAxisColor="transparent"
          initialSpacing={20}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            marginLeft: 16
          }}>
          {stackBottomGuide.map(item => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 16,
                  }}>
                  <View
                    style={{
                      backgroundColor: item.color,
                      height: 8,
                      width: 8,
                      borderRadius: 100 / 2,
                      marginRight: 4,
                    }}
                  />
                  <Text>{item.name}</Text>
                </View>
              </>
            );
          })}
        </View>
      </View>
    </Frame>
  );
};

export default DummyScreen;

const styles = StyleSheet.create({});
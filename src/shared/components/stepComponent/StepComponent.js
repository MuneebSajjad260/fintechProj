import { Text, View } from 'react-native';
import React from 'react';
import styles from './StepComponent.style';
import { Divider } from 'react-native-paper';
import { AppTheme } from '../../theme';

/*
* props will consist of the following properties.
* {true} means step is currently active
* {false} means step is not currently active
* isCompleted means step is completed
*/

const StepComponent = (props) => {
  const { stepOne, stepTwo, stepThree, dedicatedDesk, privateOffice, hybrid, stepFour } = props;
  return (
    <View>
      {privateOffice == true && (
        <View style={styles.mainContainer}>
          <View style={[styles.txtContainer,
            {
              backgroundColor: stepOne === 'isActive' ? AppTheme.COLORS.activeStepBar :
                (stepOne === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar)
            }]}>
            <Text style={styles.txt}>1</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.txtContainer, { backgroundColor: stepTwo === 'isActive' ? AppTheme.COLORS.activeStepBar : (stepTwo === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar) }]}>
            <Text style={styles.txt}>2</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.txtContainer, { backgroundColor: stepThree === 'isActive' ? AppTheme.COLORS.activeStepBar : (stepThree === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar) }]}>
            <Text style={styles.txt}>3</Text>
          </View>
        </View>
      )
      }

      {dedicatedDesk == true && (
        <View style={styles.mainContainer}>
          <View style={[styles.txtContainer,
            {
              backgroundColor: stepOne === 'isActive' ? AppTheme.COLORS.activeStepBar :
                (stepOne === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar)
            }]}>
            <Text style={styles.txt}>1</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.txtContainer, { backgroundColor: stepTwo === 'isActive' ? AppTheme.COLORS.activeStepBar : (stepTwo === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar) }]}>
            <Text style={styles.txt}>2</Text>
          </View>

        </View>
      )
      }
      {hybrid == true && (
        <View style={styles.mainContainer}>
          <View style={[styles.txtContainer,
            {
              backgroundColor: stepOne === 'isActive' ? AppTheme.COLORS.activeStepBar :
                (stepOne === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar)
            }]}>
            <Text style={styles.txt}>1</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.txtContainer, { backgroundColor: stepTwo === 'isActive' ? AppTheme.COLORS.activeStepBar : (stepTwo === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar) }]}>
            <Text style={styles.txt}>2</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.txtContainer, { backgroundColor: stepThree === 'isActive' ? AppTheme.COLORS.activeStepBar : (stepThree === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar) }]}>
            <Text style={styles.txt}>3</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.txtContainer, { backgroundColor: stepFour === 'isActive' ? AppTheme.COLORS.activeStepBar : (stepFour === 'isCompleted' ? AppTheme.COLORS.completedStepBar : AppTheme.COLORS.inActiveStepBar) }]}>
            <Text style={styles.txt}>4</Text>
          </View>
        </View>
      )
      }


    </View>


  );
};

export default StepComponent;

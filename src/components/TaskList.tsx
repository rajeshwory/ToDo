import * as React from 'react';
import {FlatList, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {List, withTheme, Checkbox} from 'react-native-paper';
import {AppThemeType} from '../../App';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface IProps {
  theme: AppThemeType;
  data: ITask[];
  onChecked: (item: ITask) => void;
  onPress: (item: ITask) => void;
  onRefresh: () => void;
}

interface ITask {
  title: string;
  description: string;
  status: boolean;
}

const TaskList = ({theme, data, onChecked, onPress, onRefresh}: IProps) => (
  <FlatList
    data={data}
    onRefresh={onRefresh}
    refreshing={false}
    renderItem={({item, index}) => (
      <List.Item
        title={item.title}
        onPress={() => onPress(item)}
        description={item.description.substring(0, 40)}
        right={props => (
          <TouchableOpacity
            onPress={() => onChecked(item)}
            style={{width: 50, height: 30}}>
            <Icon
              name={item.status ? 'checkbox-active' : 'checkbox-passive'}
              color={theme.colors.modal}
              size={20}
            />
          </TouchableOpacity>
        )}
        style={{
          backgroundColor: theme.colors.list,
          marginTop: 15,
          borderRadius: 15,
        }}
      />
    )}
    style={{width: '100%', padding: 15}}
  />
);

export default withTheme(TaskList);

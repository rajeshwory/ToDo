import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  withTheme,
  Text,
  Avatar,
  ActivityIndicator,
  TextInput,
} from 'react-native-paper';
import {AppThemeType} from '../../App';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AddTaskModal from '../components/AddTaskModal';
import TaskList from '../components/TaskList';
import EditTaskModal from '../components/EditTaskModal';
import {Menu} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';

interface IProps {
  theme: AppThemeType;
}

interface ITask {
  id?: string;
  title: string;
  description: string;
  status: boolean;
  userId?: string;
}

const EmptyTaskList = ({theme}: IProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={require('../assets/checklist.png')} style={styles.img} />
      <Text variant="headlineMedium" style={{color: theme.colors.text}}>
        What do you want to do today?
      </Text>
      <Text
        variant="titleMedium"
        style={{color: theme.colors.text, marginTop: 10, marginBottom: 15}}>
        Tap + to add your tasks
      </Text>
    </View>
  );
};

const Home = ({theme, navigation}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask>({} as ITask);
  const [drawerActive, setDrawerActive] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const {id, email, setUserId, setUserEmail} = useAuth();

  const getData = () => {
    setLoading(true);
    return (
      firestore()
        .collection('Tasks')
        .where('userId', '==', id)
        // .orderBy('status')
        .get()
        .then(querySnapshot => {
          setLoading(false);
          const items: any = [];
          console.log('aaasnap', querySnapshot);
          querySnapshot.forEach(documentSnapshot => {
            items.push({id: documentSnapshot.id, ...documentSnapshot.data()}); //concatenate id with obj
          });
          setTodo(items);
        })
    );
  };

  useEffect(() => {
    if (!!id) {
      const subscriber = getData();

      // Stop listening for updates when no longer required
      return () => subscriber();
    }
  }, [id]);

  const onAdd = (task: ITask) => {
    task.status = false;
    task.userId = id;

    firestore()
      .collection('Tasks')
      .add(task)
      .then(() => {
        getData();
        console.log('Task added!');
      });
    setTodo([...todo, task]);
    setAddModalVisible(false);
  };

  const onUpdate = (task: ITask) => {
    firestore()
      .collection('Tasks')
      .doc(task.id)
      .update({
        title: task.title,
        description: task.description,
        userId: id,
      })
      .then(() => {
        setEditModalVisible(false);
        getData();
      });
  };

  const onDelete = (task: ITask) => {
    firestore()
      .collection('Tasks')
      .doc(task.id)
      .delete()
      .then(() => {
        setEditModalVisible(false);
        getData();
      });
  };
  const onChecked = (task: ITask) => {
    firestore()
      .collection('Tasks')
      .doc(task.id)
      .update({
        status: !task.status,
      })
      .then(() => {
        getData();
      });
  };

  const onPress = (item: ITask) => {
    console.log('ssss', item);
    setEditModalVisible(true);
    setTask(item);
  };

  const onLogout = () => {
    setUserId('');
    setUserEmail('');
    setDrawerActive(false);
    navigation.navigate('Splash');
  };

  const onAlphaSort = () => {
    const newTodo = _.sortBy(todo, 'title');

    setTodo([...newTodo]);

    setMenuActive(false);
  };

  const onChecklistSort = () => {
    const newTodo = _.sortBy(todo, 'status');

    setTodo([...newTodo]);

    setMenuActive(false);
  };

  const List = () => {
    return todo.length === 0 ? (
      <EmptyTaskList theme={theme} />
    ) : (
      <TaskList
        data={todo}
        onChecked={onChecked}
        onPress={onPress}
        onRefresh={getData}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary, padding: 15}}>
      <View
        style={{
          position: 'relative',
          padding: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Menu
            visible={menuActive}
            onDismiss={() => setMenuActive(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuActive(true)}>
                <AntDesignIcon
                  name="menufold"
                  color={theme.colors.text}
                  size={30}
                />
              </TouchableOpacity>
            }>
            <Menu.Item title="Sort By Checklist" onPress={onChecklistSort} />
            <Menu.Item title="Sort By Alphabets" onPress={onAlphaSort} />
          </Menu>
        </View>

        <Text variant="headlineLarge" style={{color: theme.colors.text}}>
          Todo List
        </Text>

        <View>
          <Menu
            visible={drawerActive}
            onDismiss={() => setDrawerActive(false)}
            anchor={
              <TouchableOpacity onPress={setDrawerActive}>
                <Avatar.Text
                  size={44}
                  label={email?.substring(0, 1)?.toUpperCase()}
                  style={{backgroundColor: theme.colors.background}}
                />
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => {
                Alert.alert('Logout', 'Do you want to logout from the app?', [
                  {
                    text: 'Cancel',
                    onPress: () => setDrawerActive(false),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => onLogout()},
                ]);
              }}
              title="Logout"
            />
          </Menu>
        </View>
      </View>
      <View>
        <TextInput
          placeholder="Search"
          //theme={{colors: {primary: 'white'}}}
          placeholderTextColor={theme.colors.text}
          textColor="white"
          mode="outlined"
          outlineColor={theme.colors.text}
          selectionColor={theme.colors.text}
          activeOutlineColor={theme.colors.text}
          onChangeText={(input: string) => {
            if (input === '') {
              return getData();
            }

            if (input.length > 2) {
              const newTodo = todo.filter(item =>
                item.title.toLowerCase().includes(input.toLowerCase()),
              );

              setTodo([...newTodo]);
            }
          }}
          outlineStyle={{
            borderRadius: 16,
          }}
          style={{
            height: 50,
            backgroundColor: theme.colors.modal,
            marginTop: 8,
            marginHorizontal: 15,
          }}
        />
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={40} color="red" />
          <Text style={{color: 'white'}} variant="labelLarge">
            Loading...
          </Text>
        </View>
      ) : (
        <List />
      )}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setAddModalVisible(true)}>
          <IonIcon name="add-circle" color={theme.colors.button} size={48} />
        </TouchableOpacity>
      </View>
      <AddTaskModal
        visible={addModalVisible}
        setVisible={setAddModalVisible}
        onAdd={onAdd}
      />

      <EditTaskModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        task={task}
        onUpdate={onUpdate}
        onDelete={onDelete}
        // onAdd={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 400,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default withTheme(Home);

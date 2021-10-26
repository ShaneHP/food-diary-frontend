import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#333',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        color: 'black',
    },
    inputButton: {
        marginVertical: 5,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    smallText: {
        fontFamily: 'nunito-regular',
        fontSize: 15,
        color: '#333',
    },
    content: {
        flex: 1,
    },
    boldText: {
        fontWeight: 'bold',
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: 'blue',
        color: 'white',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
});

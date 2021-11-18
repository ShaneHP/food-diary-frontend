import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
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
        backgroundColor: 'white',
        marginTop: 5,
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
        paddingHorizontal: 30,
        alignSelf: 'center',
        color: 'black',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
        paddingHorizontal: 30,
        alignSelf: 'flex-end',
        color: 'black',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

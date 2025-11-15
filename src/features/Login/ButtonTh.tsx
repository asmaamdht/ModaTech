import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
type ButtonThProps = {
    title: string | React.ReactNode;
    onPress: () => void;
    disabled?: boolean
}

const ButtonTh: React.FC<ButtonThProps> = ({ title, onPress, disabled }) => {
    return (
        <TouchableOpacity style={styles.submitBtn} onPress={onPress} activeOpacity={0.8} disabled={disabled}>
            {typeof title === "string" ? <Text style={styles.text} >{title}</Text> : title}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    submitBtn: {
        width: "50%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        textTransform: "uppercase",
    },
})


export default ButtonTh
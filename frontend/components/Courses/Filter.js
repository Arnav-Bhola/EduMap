import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { CoursesContext } from "../../store/courses";
import { useFilterVisibility } from "../../store/filter-visibility";
import { Colors } from "../../utils/constants/colors";
import { convertDuration } from "../../utils/util";
import { DarkModeContext } from "../../store/dark-mode";

const Filter = ({ onApply }) => {
  const { theme } = useContext(DarkModeContext);
  const { toggleFilter } = useFilterVisibility();
  const { filters, setFilters } = useContext(CoursesContext);
  const [subject, setSubject] = useState(filters.subject);
  const [minDuration, setMinDuration] = useState(
    filters.duration[0].number.toString()
  );
  const [maxDuration, setMaxDuration] = useState(
    filters.duration[1].number.toString()
  );
  const [price, setPrice] = useState(filters.price);
  const [level, setLevel] = useState(filters.level);

  const [minDurationUnit, setMinDurationUnit] = useState(
    filters.duration[0].unit
  );
  const [maxDurationUnit, setMaxDurationUnit] = useState(
    filters.duration[1].unit
  );

  const handleSubjectChange = (option) => {
    setSubject(option.value);
  };

  const handleMinDurationChange = (value) => {
    setMinDuration(value);
  };

  const handleMaxDurationChange = (value) => {
    setMaxDuration(value);
  };

  const handlePriceChange = (option) => {
    setPrice(option.value);
  };
  ``;

  const handleLevelChange = (option) => {
    setLevel(option.value);
  };

  const handleMinDurationUnitChange = (option) => {
    setMinDurationUnit(option.value);
  };

  const handleMaxDurationUnitChange = (option) => {
    setMaxDurationUnit(option.value);
  };

  const applyFilters = () => {
    if (
      convertDuration({ number: minDuration, unit: minDurationUnit }) >=
      convertDuration({ number: maxDuration, unit: maxDurationUnit })
    ) {
      return;
    }
    setFilters({
      name: "",
      subject,
      duration: [
        { number: parseInt(minDuration) || 0, unit: minDurationUnit },
        { number: parseInt(maxDuration) || 100, unit: maxDurationUnit },
      ],
      price,
      level,
    });
    toggleFilter();
    onApply();
  };

  const clearFilters = () => {
    setSubject("any");
    setMinDuration("0");
    setMaxDuration("100");
    setPrice("any");
    setLevel("any");
    setMinDurationUnit("hours");
    setMaxDurationUnit("months");

    setFilters({
      name: "",
      subject: "any",
      duration: [
        { number: 0, unit: "Hours" },
        { number: 100, unit: "Months" },
      ],
      price: "any",
      level: "any",
    });
  };

  const subjectOptions = [
    { key: 0, label: "Any", value: "any" },
    { key: 1, label: "Technology", value: "Tech" },
    { key: 2, label: "Science", value: "Science" },
    { key: 3, label: "Business", value: "Business" },
    { key: 4, label: "Social Studies", value: "Social Studies" },
    { key: 5, label: "Arts", value: "Arts" },
    { key: 6, label: "Math", value: "Math" },
    { key: 7, label: "Engineering", value: "Engineering" },
    { key: 8, label: "Standardized Tests", value: "Standardized Exams" },
  ];

  const levelOptions = [
    { key: 0, label: "Any", value: "any" },
    { key: 1, label: "Introductory", value: "Introductory" },
    { key: 2, label: "Intermediate", value: "Intermediate" },
    { key: 3, label: "Advanced", value: "Advanced" },
  ];

  const durationUnits = [
    { key: 0, label: "Hours", value: "hours" },
    { key: 1, label: "Days", value: "days" },
    { key: 2, label: "Weeks", value: "weeks" },
    { key: 3, label: "Months", value: "months" },
  ];

  const priceOptions = [
    { key: 0, label: "Any", value: "any" },
    { key: 1, label: "Free", value: "Free" },
    { key: 2, label: "Paid", value: "Paid" },
  ];

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      width: "100%",
      borderBottomColor: Colors.black,
      borderWidth: 1,
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3, // Adjust this to change the shadow's opacity
      shadowRadius: 5,
    },
    row: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 10,
      marginTop: 5,
    },
    filter: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    label: {
      fontSize: 16,
      color: theme === "light" ? Colors.black : Colors.white,
      width: "20%",
      marginBottom: 10,
    },
    input: {
      padding: 8,
      marginBottom: 16,
      borderRadius: 4,
      backgroundColor: theme === "light" ? Colors.white : Colors.blue750,
      borderWidth: 2,
      borderColor: theme === "light" ? Colors.black : Colors.white,
      color: theme === "light" ? Colors.black : Colors.white,
      width: "40%",
    },
    picker: {
      marginBottom: 16,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme === "light" ? Colors.black : Colors.white,
      color: theme === "light" ? Colors.black : Colors.white,
      backgroundColor: theme === "dark" ? Colors.blue750 : Colors.white,
      width: "75%",
    },
    rowPicker: {
      width: "56%",
    },
    pickerText: {
      color: theme === "light" ? Colors.black : Colors.white,
      fontSize: 16,
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    optionContainer: {
      backgroundColor: theme === "light" ? Colors.blue400 : Colors.blue750,
      borderRadius: 8,
      width: "100%",
      alignSelf: "center",
      padding: 0,
      margin: 0,
    },
    option: {
      padding: 12,
      borderBottomWidth: 1,
      width: "90%",
      borderBottomColor: theme === "light" ? Colors.black : Colors.blue400,
      backgroundColor: theme === "light" ? Colors.blue400 : Colors.blue750,
      alignSelf: "center",
    },
    cancelButton: {
      paddingVertical: 10,
      backgroundColor: Colors.red200,
      borderRadius: 5,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      gap: 10,
    },
    buttonContainer: {
      width: "40%",
      borderRadius: 5,
    },
    button: {
      fontSize: 16,
      padding: 10,
      backgroundColor: "#93c78e",
      color: Colors.black,
      textAlign: "center",
      borderRadius: 5,
    },
    clearButton: {
      backgroundColor: Colors.red200,
      color: Colors.white,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <View style={styles.filter}>
        <Text style={styles.label}>Subject:</Text>
        <ModalSelector
          data={subjectOptions}
          initValue={
            subjectOptions.find((option) => option.value === subject)?.label ||
            "Any"
          }
          onChange={handleSubjectChange}
          cancelText="Cancel"
          style={styles.picker} // Style for the overall picker (select box)
          selectTextStyle={styles.pickerText} // Style for the text in the picker
          cancelTextStyle={styles.pickerText} // Style for the cancel button text
          optionTextStyle={styles.pickerText} // Style for option text
          overlayStyle={styles.overlay} // Style for the background overlay
          optionContainerStyle={styles.optionContainer} // Style for the container of options
          optionStyle={styles.option} // Style for each option
          sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
          cancelStyle={styles.cancelButton} // Style for the cancel button
        />
      </View>

      <Text style={styles.label}>Max Len:</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={minDuration}
          onChangeText={handleMinDurationChange}
          placeholder="Min duration"
        />
        <ModalSelector
          data={durationUnits}
          initValue={
            durationUnits.find((option) => option.value === minDurationUnit)
              ?.label || "Hours"
          }
          onChange={handleMinDurationUnitChange}
          cancelText="Cancel"
          style={[styles.picker, styles.rowPicker]} // Style for the overall picker (select box)
          selectTextStyle={styles.pickerText} // Style for the text in the picker
          cancelTextStyle={styles.pickerText} // Style for the cancel button text
          optionTextStyle={styles.pickerText} // Style for option text
          overlayStyle={styles.overlay} // Style for the background overlay
          optionContainerStyle={styles.optionContainer} // Style for the container of options
          optionStyle={styles.option} // Style for each option
          sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
          cancelStyle={styles.cancelButton} // Style for the cancel button
        />
      </View>
      <Text style={styles.label}>Min Len:</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={maxDuration}
          onChangeText={handleMaxDurationChange}
        />
        <ModalSelector
          data={durationUnits}
          initValue={
            durationUnits.find((option) => option.value === maxDurationUnit)
              ?.label || "Weeks"
          }
          onChange={handleMaxDurationUnitChange}
          cancelText="Cancel"
          style={[styles.picker, styles.rowPicker]} // Style for the overall picker (select box)
          selectTextStyle={styles.pickerText} // Style for the text in the picker
          cancelTextStyle={styles.pickerText} // Style for the cancel button text
          optionTextStyle={styles.pickerText} // Style for option text
          overlayStyle={styles.overlay} // Style for the background overlay
          optionContainerStyle={styles.optionContainer} // Style for the container of options
          optionStyle={styles.option} // Style for each option
          sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
          cancelStyle={styles.cancelButton} // Style for the cancel button
        />
      </View>
      <View style={styles.filter}>
        <Text style={styles.label}>Price:</Text>
        <ModalSelector
          data={priceOptions}
          initValue={
            priceOptions.find((option) => option.value === price)?.label ||
            "Any"
          }
          onChange={handlePriceChange}
          cancelText="Cancel"
          style={styles.picker} // Style for the overall picker (select box)
          selectTextStyle={styles.pickerText} // Style for the text in the picker
          cancelTextStyle={styles.pickerText} // Style for the cancel button text
          optionTextStyle={styles.pickerText} // Style for option text
          overlayStyle={styles.overlay} // Style for the background overlay
          optionContainerStyle={styles.optionContainer} // Style for the container of options
          optionStyle={styles.option} // Style for each option
          sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
          cancelStyle={styles.cancelButton} // Style for the cancel button
        />
      </View>
      <View style={styles.filter}>
        <Text style={styles.label}>Level:</Text>
        <ModalSelector
          data={levelOptions}
          initValue={
            levelOptions.find((option) => option.value === level)?.label ||
            "Any"
          }
          onChange={handleLevelChange}
          cancelText="Cancel"
          style={styles.picker} // Style for the overall picker (select box)
          selectTextStyle={styles.pickerText} // Style for the text in the picker
          cancelTextStyle={styles.pickerText} // Style for the cancel button text
          optionTextStyle={styles.pickerText} // Style for option text
          overlayStyle={styles.overlay} // Style for the background overlay
          optionContainerStyle={styles.optionContainer} // Style for the container of options
          optionStyle={styles.option} // Style for each option
          sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
          cancelStyle={styles.cancelButton} // Style for the cancel button
        />
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Text
            style={[styles.button, styles.clearButton]}
            onPress={clearFilters}
          >
            Clear Filters
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text onPress={applyFilters} style={styles.button}>
            Apply Filters
          </Text>
        </View>
      </View>r
    </ScrollView>
  );
};

export default Filter;

import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { CoursesContext } from "../../store/courses";
import { useFilterVisibility } from "../../store/filter-visibility";
import { Colors } from "../../utils/constants/colors";
import { convertDuration } from "../../utils/util";

const Filter = ({ onApply }) => {
  const { toggleFilter } = useFilterVisibility();
  const { filters, setFilters } = useContext(CoursesContext);
  const [subject, setSubject] = useState(filters.subject);
  const [minDuration, setMinDuration] = useState(filters.duration[0].number.toString());
  const [maxDuration, setMaxDuration] = useState(filters.duration[1].number.toString());
  const [price, setPrice] = useState(filters.price);
  const [level, setLevel] = useState(filters.level);

  const [minDurationUnit, setMinDurationUnit] = useState(filters.duration[0].unit);
  const [maxDurationUnit, setMaxDurationUnit] = useState(filters.duration[1].unit);

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

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps='handled'
      bounces={false}
    >
      <Text style={styles.label}>Subject:</Text>
      <ModalSelector
        data={subjectOptions}
        initValue={subjectOptions.find((option) => option.value === subject)?.label || "Any"}
        onChange={handleSubjectChange}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        cancelText='Cancel'
        cancelTextStyle={styles.pickerText}
        optionTextStyle={styles.pickerText}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Duration (Min):</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={minDuration}
          onChangeText={handleMinDurationChange}
          placeholder='Min duration'
        />
        <ModalSelector
          data={durationUnits}
          initValue={
            durationUnits.find((option) => option.value === minDurationUnit)?.label || "Hours"
          }
          onChange={handleMinDurationUnitChange}
          style={styles.picker}
          selectTextStyle={styles.pickerText}
          cancelText='Cancel'
          cancelTextStyle={styles.pickerText}
          optionTextStyle={styles.pickerText}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration (Max):</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={maxDuration}
          onChangeText={handleMaxDurationChange}
          placeholder='Max duration'
        />
        <ModalSelector
          data={durationUnits}
          initValue={
            durationUnits.find((option) => option.value === maxDurationUnit)?.label || "Weeks"
          }
          onChange={handleMaxDurationUnitChange}
          style={styles.picker}
          selectTextStyle={styles.pickerText}
          cancelText='Cancel'
          cancelTextStyle={styles.pickerText}
          optionTextStyle={styles.pickerText}
        />
      </View>

      <Text style={styles.label}>Price:</Text>
      <ModalSelector
        data={priceOptions}
        initValue={priceOptions.find((option) => option.value === price)?.label || "Any"}
        onChange={handlePriceChange}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        cancelText='Cancel'
        cancelTextStyle={styles.pickerText}
        optionTextStyle={styles.pickerText}
      />

      <Text style={styles.label}>Level:</Text>
      <ModalSelector
        data={levelOptions}
        initValue={levelOptions.find((option) => option.value === level)?.label || "Any"}
        onChange={handleLevelChange}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        cancelText='Cancel'
        cancelTextStyle={styles.pickerText}
        optionTextStyle={styles.pickerText}
      />

      <View style={styles.buttonsContainer}>
        <Text
          style={styles.button}
          onPress={clearFilters}
        >
          Clear Filters
        </Text>
        <Text
          style={styles.button}
          onPress={applyFilters}
        >
          Apply Filters
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  pickerText: {
    fontSize: 16,
    color: Colors.black,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    fontSize: 16,
    color: Colors.primary,
    padding: 10,
  },
});

export default Filter;

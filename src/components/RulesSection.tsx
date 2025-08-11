import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";

interface RulesSectionProps {
  tasks: any[];
  clients: any[];
  workers: any[];
  onRulesChange: (rules: any[]) => void;
}

const RulesSection: React.FC<RulesSectionProps> = ({
  tasks,
  clients,
  workers,
  onRulesChange,
}) => {
  const [rules, setRules] = useState<any[]>([]);
  const [newRule, setNewRule] = useState<any>({ type: "coRun", data: {} });

  const addRule = () => {
    const updatedRules = [...rules, newRule];
    setRules(updatedRules);
    onRulesChange(updatedRules);
    setNewRule({ type: "coRun", data: {} });
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "grey.800",
        borderRadius: 2,
        mt: 3,
        backgroundColor: "grey.900",
        color: "grey.100",
      }}
    >
      <Typography variant="h6" gutterBottom>
        ⚙️ Business Rules
      </Typography>

      {/* Rule Type Selector */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "grey.300" }}>Rule Type</InputLabel>
        <Select
          value={newRule.type}
          onChange={(e) => setNewRule({ type: e.target.value, data: {} })}
          sx={{
            color: "grey.100",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "grey.700" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.500",
            },
          }}
        >
          <MenuItem value="coRun">Co-Run</MenuItem>
          <MenuItem value="slotRestriction">Slot Restriction</MenuItem>
          <MenuItem value="loadLimit">Load Limit</MenuItem>
          <MenuItem value="phaseWindow">Phase Window</MenuItem>
          <MenuItem value="patternMatch">Pattern Match</MenuItem>
          <MenuItem value="precedenceOverride">Precedence Override</MenuItem>
        </Select>
      </FormControl>

      {/* Task Multi-Select for CoRun */}
      {newRule.type === "coRun" && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "grey.300" }}>Select Tasks</InputLabel>
          <Select
            multiple
            value={newRule.data.tasks || []}
            onChange={(e) =>
              setNewRule({
                ...newRule,
                data: { tasks: e.target.value },
              })
            }
            input={<OutlinedInput label="Select Tasks" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => {
                  const taskName =
                    tasks.find((t) => t.TaskID === value)?.TaskName || value;
                  return (
                    <Chip
                      key={value}
                      label={taskName}
                      sx={{ backgroundColor: "grey.800", color: "grey.100" }}
                    />
                  );
                })}
              </Box>
            )}
            sx={{
              color: "grey.100",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "grey.700" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.500",
              },
            }}
          >
            {tasks.map((t) => (
              <MenuItem key={t.TaskID} value={t.TaskID}>
                {t.TaskName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Add Rule Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={addRule}
        sx={{ mt: 1 }}
      >
        Add Rule
      </Button>

      {/* Current Rules Display */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Current Rules:
      </Typography>
      <Box
        component="pre"
        sx={{
          backgroundColor: "grey.800",
          p: 2,
          borderRadius: 1,
          overflowX: "auto",
          color: "grey.200",
          fontSize: "0.85rem",
        }}
      >
        {JSON.stringify(rules, null, 2)}
      </Box>
    </Box>
  );
};

export default RulesSection;

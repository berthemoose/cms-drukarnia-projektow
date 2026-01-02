import { processOrder } from "../services/orderService";

export const handleOrder = async (req, res) => {
  try {
    await processOrder({ file: req.file, body: req.body });
    res.status(201).json({ response: "Zamówienie złożone pomyślnie" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

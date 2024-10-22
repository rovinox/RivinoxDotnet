import { useState, useEffect, useRef, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputMask from "react-input-mask";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Card from "./Card";
import Header from "../../component/header/Header";
import Payment from "payment";
import ReactToastify from "../../component/ReactToastify.js";
import AutocompleteInput from "../../component/autocompleteInput/Index.js";
import { toast } from "react-toastify";
import { apiService } from "../../api/axios.js";


export default function PaymentForm() {
  const amountInput = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user: ", user);
  const [receiverId, setReceiverId] = useState(null);
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focused, setFocused] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState([]);
  const [amex, setAmex] = useState(false);
  const [customAmount, setCustomAmount] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const handleInputFocus = ({ target }) => {
    setFocused(target.id);
  };
  const getUser = useCallback(async () => {
    try {
      const result = await apiService.get(
        "http://localhost:5122/api/account/signed/user"
      );
      console.log("result: ", result);
      console.log("result: ", result);
      if (result?.data) {
        setPaymentType([
          {
            value: result?.data?.balance,
            label: "Pay in Full",
          },
          {
            value: "custom",
            label: "Custom Amount",
          },
          {
            value: "cash",
            label: "Cash",
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payLoad = {amount}
    const cardInfo = {
      cvc,
      expiry,
      number,
      amount,
      name,
      zipCode,
      email: user.email,
      paymentType
    };
    if(isCash){
      payLoad.paymentType = "cash"
      payLoad.cashReceiverId = receiverId

    }

    

    console.log('payLoad: ', {payLoad, cardInfo, receiverId});
    

    try {
      const result = await apiService.post("http://localhost:5122/api/payment/process", payLoad);
      if (result.status === 200) {
        console.log(result);
        toast.success("Your payment has been sent successfully");
        getUser();
        setCvc("");
        setExpiry("");
        setName("");
        setNumber("");
        setZipCode("");
        setAmount(0);
        setCustomAmount(false);
      }
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };

  return (
    <div style={{ marginTop: 50 }}>
      <Header />
      <ReactToastify />
      <Card
        locale={{
          valid: "Expire",
        }}
        placeholders={{
          name: "Your name",
        }}
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focused}
        callback={console.log}
      />
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
        }}
        xs={12}
        md={6}
      >
        <Box
          component="form"
          Validate
          onSubmit={handleSubmit}
          sx={{ mt: 3, p: 2, maxWidth: 800 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Payment Type"
                helperText="Please select your payment type"
              >
                {paymentType?.length > 0 &&
                  paymentType.map((option) => (
                    <MenuItem
                      onClick={() => {
                        console.log(option.value);
                        if (
                          option.value === "custom" ||
                          option.value === "cash"
                        ) {
                          setAmount("");
                          setCustomAmount(true);
                          if (option.value === "cash") {
                            setIsCash(true);
                          } else {
                            setIsCash(false);
                          }
                        } else {
                          setAmount(option.value);
                          setCustomAmount(false);
                          setIsCash(false);
                        }
                      }}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={amountInput}
                fullWidth
                id="Amount"
                label="Amount"
                name="Amount"
                type="number"
                value={amount}
                disabled={!customAmount}
                helperText={customAmount ? "Please select your a amount" : ""}
                onFocusCapture={handleInputFocus}
                error={customAmount && !amount ? true : false}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            {isCash ? (
              <Grid item xs={12}>
                <AutocompleteInput onChange={setReceiverId} />
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <InputMask
                    mask={amex ? "9999 999999 99999" : "9999 9999 9999 9999"}
                    value={number}
                    onChange={(e) => {
                      const issuer = Payment.fns.cardType(e.target.value);
                      setAmex(issuer === "amex");
                      console.log("issuer", issuer);
                      setNumber(e.target.value);
                    }}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        id="number"
                        name="number"
                        fullWidth
                        required
                        label="Card Number"
                        onFocusCapture={handleInputFocus}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="name"
                    name="name"
                    fullWidth
                    required
                    label="Name on the card"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocusCapture={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="zipcode"
                    name="zipcode"
                    fullWidth
                    required
                    label="Zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    onFocusCapture={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="99/99"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        id="expiry"
                        name="expiry"
                        fullWidth
                        required
                        label="Expiration"
                        onFocusCapture={handleInputFocus}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask={amex ? "9999" : "999"}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        id="cvc"
                        name="cvc"
                        fullWidth
                        required
                        label="CVC"
                        onFocusCapture={handleInputFocus}
                      />
                    )}
                  </InputMask>
                </Grid>{" "}
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            //onClick={navigateToHome}
          >
            submit
          </Button>
        </Box>
      </Grid>
    </div>
  );
}

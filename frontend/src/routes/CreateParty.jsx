import partyFetch from "../axios/config";
import useToast from "../hooks/useToast";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Form from "../components/Form";

const CreateParty = () => {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [partyServices, setPartyServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      setServices(res.data);
    };

    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    if (checked) {
      setPartyServices((services) => [...services, filteredService[0]]);
    } else {
      setPartyServices((services) => services.filter((s) => s._id !== value));
    }
  };

  const createParty = async (e) => {
    e.preventDefault();

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      };

      const res = await partyFetch.post("/parties", party);

      if (res.status === 201) {
        navigate("/");

        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  return (
    <>
      <Form
        services={services}
        title="Crei sua próxima festa"
        subtitle="Defina o seu orçamento e escolha os serviços"
        onSubmit={(e) => createParty(e)}
        submitBtnValue="Criar Festa"
        onChangePartyTitle={(e) => setTitle(e.target.value)}
        partyTitle={title}
        onChangePartyAuthor={(e) => setAuthor(e.target.value)}
        partyAuthor={author}
        onChangePartyDescription={(e) => setDescription(e.target.value)}
        partyDescription={description}
        onChangePartyBudget={(e) => setBudget(e.target.value)}
        partyBudget={budget}
        onChangePartyImage={(e) => setImage(e.target.value)}
        partyImage={image}
        onChangeServicesCheckbox={(e) => handleServices(e)}
        servicesCheckboxChecked={(serviceId) =>
          partyServices.some((s) => s._id === serviceId)
        }
      />
    </>
  );
};

export default CreateParty;

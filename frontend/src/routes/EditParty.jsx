import partyFetch from "../axios/config";
import useToast from "../hooks/useToast";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Form from "../components/Form";

const EditParty = () => {
  const { id } = useParams();

  const [party, setParty] = useState(null);

  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      setServices(res.data);

      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);

      setParty(res.data);
    };

    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);
    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }

    setParty({ ...party, services: partyServices });
  };

  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);

      if (res.status === 200) {
        navigate(`/party/${party._id}`);
        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  if (!party) return <p>Carregando...</p>;

  return (
    <>
      <Form
        services={services}
        title={`Editando: ${party.title}`}
        subtitle="Ajuste as informações da sua festa"
        onSubmit={(e) => updateParty(e)}
        submitBtnValue="Editar Festa"
        onChangePartyTitle={(e) =>
          setParty({ ...party, title: e.target.value })
        }
        partyTitle={party.title}
        onChangePartyAuthor={(e) =>
          setParty({ ...party, author: e.target.value })
        }
        partyAuthor={party.author}
        onChangePartyDescription={(e) =>
          setParty({ ...party, description: e.target.value })
        }
        partyDescription={party.description}
        onChangePartyBudget={(e) =>
          setParty({ ...party, budget: e.target.value })
        }
        partyBudget={party.budget}
        onChangePartyImage={(e) =>
          setParty({ ...party, image: e.target.value })
        }
        partyImage={party.image}
        onChangeServicesCheckbox={(e) => handleServices(e)}
        servicesCheckboxChecked={(serviceId) =>
          party.services.some((partyService) => partyService._id === serviceId)
        }
      />
    </>
  );
};

export default EditParty;

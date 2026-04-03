import "./Form.css";

const Form = ({
  services,
  title,
  subtitle,
  onSubmit,
  submitBtnValue,
  onChangePartyTitle,
  partyTitle,
  onChangePartyAuthor,
  partyAuthor,
  onChangePartyDescription,
  partyDescription,
  onChangePartyBudget,
  partyBudget,
  onChangePartyImage,
  partyImage,
  onChangeServicesCheckbox,
  servicesCheckboxChecked,
}) => {
  return (
    <div className="form-page">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <form onSubmit={onSubmit}>
        <label>
          <span>Nome da festa:</span>
          <input
            type="text"
            placeholder="Sejá criativo..."
            required
            onChange={onChangePartyTitle}
            value={partyTitle}
          />
        </label>
        <label>
          <span>Anfitrião:</span>
          <input
            type="text"
            placeholder="Quem está dando a festa?"
            required
            onChange={onChangePartyAuthor}
            value={partyAuthor}
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder="Conte mais sobre a festa..."
            required
            onChange={onChangePartyDescription}
            value={partyDescription}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            placeholder="Quanto você pretende investir..."
            required
            onChange={onChangePartyBudget}
            value={partyBudget}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Insira a URL de uma imagem"
            required
            onChange={onChangePartyImage}
            value={partyImage}
          />
        </label>
        <div>
          <h3>Escolha os serviços</h3>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={onChangeServicesCheckbox}
                      checked={servicesCheckboxChecked(service._id)}
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value={submitBtnValue} className="btn" />
      </form>
    </div>
  );
};

export default Form;

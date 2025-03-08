import Ping from "./Ping";

const ReportNumber = ({ reportCount }: { reportCount: number }) => {

  function formatNumber(number: number) {
    return number === 1 ? `${number} report` : `${number} reports`;
  }

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{formatNumber(reportCount)}</span>
      </p>
    </div>
  );
};

export default ReportNumber;

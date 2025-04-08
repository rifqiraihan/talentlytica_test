import { useRef, useCallback, memo } from "react";
import "./App.css";

const students = Array.from({ length: 10 }, (_, i) => `mahasiswa_${i + 1}`);
const aspekPenilaian = [
  "aspek_penilaian_1",
  "aspek_penilaian_2",
  "aspek_penilaian_3",
  "aspek_penilaian_4",
];
const options = Array.from({ length: 10 }, (_, i) => i + 1);

const StudentRow = memo(
  ({
    mhs,
    aspekPenilaian,
    handleChange,
  }: {
    mhs: string;
    aspekPenilaian: string[];
    handleChange: (aspek: string, mahasiswa: string, value: number) => void;
  }) => {
    return (
      <div className="table-row">
        <div className="table-cell student-cell">
          <img
            src={`https://ui-avatars.com/api/?name=${mhs.replace("_", "+")}&background=random&size=40`}
            alt="profile"
            className="avatar"
          />
          <span>{mhs.replace("_", " ")}</span>
        </div>
        {aspekPenilaian.map((aspek) => (
          <div key={aspek} className="table-cell">
            <select
              defaultValue={1}
              onChange={(e) =>
                handleChange(aspek, mhs, parseInt(e.target.value))
              }
            >
              {options.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }
);

function App() {
  const nilaiRef = useRef<Record<string, Record<string, number>>>(
    Object.fromEntries(
      aspekPenilaian.map((aspek) => [
        aspek,
        Object.fromEntries(students.map((mhs) => [mhs, 1])),
      ])
    )
  );

  const handleChange = useCallback(
    (aspek: string, mahasiswa: string, value: number) => {
      nilaiRef.current[aspek][mahasiswa] = value;
    },
    []
  );

  const handleSimpan = () => {
    console.log("Output:", nilaiRef.current);
    alert("Output berhasil dikirim ke console (lihat console log)");
  };

  return (
    <div className="container">
      <h1>Penilaian Mahasiswa</h1>
      <div className="table">
        <div className="table-header">
          <div className="table-cell header-cell">Mahasiswa</div>
          {aspekPenilaian.map((aspek) => (
            <div key={aspek} className="table-cell header-cell">
              {aspek.replace(/_/g, " ")}
            </div>
          ))}
        </div>

        {students.map((mhs) => (
          <StudentRow
            key={mhs}
            mhs={mhs}
            aspekPenilaian={aspekPenilaian}
            handleChange={handleChange}
          />
        ))}
      </div>

      <button className="simpan-button" onClick={handleSimpan}>
        SIMPAN
      </button>
    </div>
  );
}

export default App;

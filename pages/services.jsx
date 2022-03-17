import { Form, Table } from "semantic-ui-react";
import { getServices } from "./util/serviceActions";
import { parseCookies } from "nookies";
import axios from "axios";
import { baseURL } from "./util/auth";
import { useState } from "react";

const services = ({ services, user: { permission }, students }) => {
  const isTeacher = permission === "teacher";
  const [studentServices, setStudentServices] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const generateRow = (service) => {
    const { title, description, hours, createdAt, proof, reviewed } = service;

    return (
      <Table.Row key={service._id}>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        <Table.Cell>{hours}</Table.Cell>
        <Table.Cell>{createdAt.split("T")[0]}</Table.Cell>
        <Table.Cell>{proof ? "proof" : "no proof"}</Table.Cell>
        <Table.Cell
          style={
            reviewed == "approved"
              ? {
                  background: "#07BE1C",
                  textTransform: "capitalize",
                }
              : reviewed == "denied"
              ? {
                  background: "red",
                  textTransform: "capitalize",
                }
              : {
                  background: "yellow",
                  textTransform: "capitalize",
                }
          }
        >
          {reviewed}
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleChange = async (e, data) => {
    setFormLoading(true);
    const userId = data.value;
    if (!userId) setStudentServices(null);
    const newServices = await getServices(userId);
    console.log(newServices);
    setStudentServices(newServices);
    setFormLoading(false);
  };

  return (
    <>
      <Table celled style={{ marginTop: "2rem" }} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Act</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Hours</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Proof</Table.HeaderCell>
            <Table.HeaderCell>Approved</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!isTeacher ? (
            services.length == 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center">
                  You have submitted no services
                </Table.Cell>
              </Table.Row>
            ) : (
              <>{services.map((service) => generateRow(service))}</>
            )
          ) : studentServices === null ? (
            <>
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center">
                  Please Select A Student
                </Table.Cell>
              </Table.Row>
            </>
          ) : studentServices.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={6} textAlign="center">
                This student has no services
              </Table.Cell>
            </Table.Row>
          ) : (
            <>{studentServices.map((service) => generateRow(service))}</>
          )}
        </Table.Body>

        <Table.Footer>
          {isTeacher && (
            <>
              <Table.Row>
                <Table.HeaderCell colSpan={6} textAlign="center">
                  <Form.Select
                    disabled={formLoading}
                    options={students.map((student) => ({
                      key: student._id,
                      text: student.username,
                      value: student._id,
                    }))}
                    onChange={handleChange}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </>
          )}
        </Table.Footer>
      </Table>
    </>
  );
};

services.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/service`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await axios.get(`${baseURL}/api/v1/auth/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const students = users.data.users.filter(
      (user) => user.permission === "student"
    );
    return { services: res.data.services, students };
  } catch (err) {
    console.error(err);
    return { errorLoading: true };
  }
};

export default services;

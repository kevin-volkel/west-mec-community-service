import { Form, Icon, Table } from "semantic-ui-react";
import {
  getServices,
  deleteService,
  updateApproval,
} from "./util/serviceActions";
import { parseCookies } from "nookies";
import axios from "axios";
import { baseURL } from "./util/auth";
import { useState } from "react";

const services = ({ services, user: { permission }, students }) => {
  const isTeacher = permission === "teacher";

  const approvalOptions = [
    {
      key: 1,
      text: "Approved",
      value: "approved",
    },
    {
      key: 2,
      text: "Pending",
      value: "pending",
    },
    {
      key: 3,
      text: "Denied",
      value: "denied",
    },
  ];

  const [serviceList, setServiceList] = useState(services);
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
        {isTeacher ? (
          <>
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
              <Form.Select
                options={approvalOptions}
                onChange={ async (e, data) => {
                  await updateApproval(service._id, setStudentServices, data.value);
                }}
                value={reviewed}
              />
            </Table.Cell>
          </>
        ) : (
          <>
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
          </>
        )}

        <Table.Cell width={1}>
          <Icon
            name="trash"
            color="red"
            onClick={() => {
              setFormLoading(true);
              if (permission === "teacher") {
                deleteService(service._id, setStudentServices);
              } else {
                deleteService(service._id, setServiceList);
              }
              setFormLoading(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </Table.Cell>
      </Table.Row>
    );
  };

  const handleChange = async (e, data) => {
    setFormLoading(true);
    const userId = data.value;
    if (!userId) setStudentServices(null);
    const newServices = await getServices(userId);
    // console.log(newServices);
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
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!isTeacher ? (
            serviceList.length == 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center">
                  You have submitted no services
                </Table.Cell>
              </Table.Row>
            ) : (
              <>{serviceList.map((service) => generateRow(service))}</>
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
                      text: student.name,
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
    const students = users.data.users
      .filter((user) => user.permission === "student")
      .sort((a, b) => a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]));
    return { services: res.data.services, students };
  } catch (err) {
    console.error(err);
    return { errorLoading: true };
  }
};

export default services;
